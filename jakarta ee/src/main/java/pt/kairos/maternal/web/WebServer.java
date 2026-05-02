package pt.kairos.maternal.web;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;
import org.jboss.weld.environment.se.Weld;
import org.jboss.weld.environment.se.WeldContainer;
import pt.kairos.maternal.ai.KairosAssistant;
import pt.kairos.maternal.profile.ProfileService;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.Executors;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Servidor HTTP minimalista (JDK only) que expoe o KairosAssistant em /api/chat.
 *
 * <p>Reutiliza o mesmo container Weld SE do CLI — mesmo classpath, mesmo modelo,
 * mesmo H2. Existe porque o Liberty 26.0.0.3-beta tem conflitos de classloading
 * com o ConfigProducer do mpConfig que o LangChain4j-CDI provoca.
 */
public final class WebServer {

    private static final int PORT = Integer.getInteger("kairos.web.port", 9080);
    private static final String DEFAULT_MOTHER_ID = "web-maria";

    private static final String BREVITY_HINT = """

            Estilo de resposta para esta interface (web/mobile):
              - Max 2-3 frases curtas. Sem listas, sem titulos, sem markdown.
              - Tom directo e caloroso, sem disclaimers repetidos.
              - Nao confirmes registos no fim.
            """;

    public static void main(String[] args) throws Exception {
        if (System.getenv("OPENAI_API_KEY") == null || System.getenv("OPENAI_API_KEY").isBlank()) {
            System.err.println("[aviso] OPENAI_API_KEY nao definida. O modelo vai falhar.");
        }

        // Diagnostico: confirma que o JPA provider esta resolvido neste classpath.
        try {
            jakarta.persistence.Persistence.createEntityManagerFactory("kairos-cli").close();
            System.out.println("[diag] JPA OK — EclipseLink resolvido.");
        } catch (Throwable t) {
            System.err.println("[diag] JPA FALHOU: " + t.getClass().getSimpleName() + ": " + t.getMessage());
            t.printStackTrace();
        }

        try (WeldContainer container = new Weld().initialize()) {
            KairosAssistant assistant = container.select(KairosAssistant.class).get();
            ProfileService profiles = container.select(ProfileService.class).get();

            // Forca init eager do repositorio JPA enquanto a main thread ainda tem
            // o TCCL correcto (a thread do HttpServer executor nao consegue ver o
            // PersistenceProvider via SPI durante request handling).
            profiles.loadOrCreate("__bootstrap__");

            ClassLoader appCl = Thread.currentThread().getContextClassLoader();
            HttpServer server = HttpServer.create(new InetSocketAddress(PORT), 0);
            server.setExecutor(Executors.newFixedThreadPool(4, r -> {
                Thread t = new Thread(r, "kairos-http");
                t.setContextClassLoader(appCl);
                return t;
            }));

            server.createContext("/api/status", ex -> {
                addCors(ex);
                if ("OPTIONS".equalsIgnoreCase(ex.getRequestMethod())) { ex.sendResponseHeaders(204, -1); return; }
                send(ex, 200, "text/plain; charset=utf-8", "Kairos Maternal Engine running");
            });

            server.createContext("/api/chat", ex -> {
                addCors(ex);
                if ("OPTIONS".equalsIgnoreCase(ex.getRequestMethod())) { ex.sendResponseHeaders(204, -1); return; }
                if (!"POST".equalsIgnoreCase(ex.getRequestMethod())) { ex.sendResponseHeaders(405, -1); return; }

                String body = new String(ex.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);
                String message = extractJsonString(body, "message");
                String motherId = extractJsonString(body, "motherId");
                if (motherId == null || motherId.isBlank()) motherId = DEFAULT_MOTHER_ID;

                if (message == null || message.isBlank()) {
                    send(ex, 400, "application/json", "{\"reply\":\"Mensagem vazia.\"}");
                    return;
                }

                try {
                    profiles.loadOrCreate(motherId);
                    String context = profiles.renderContext(motherId) + BREVITY_HINT;
                    String reply = assistant.chat(motherId, message, context);
                    send(ex, 200, "application/json", "{\"reply\":" + jsonString(reply) + "}");
                } catch (RuntimeException e) {
                    e.printStackTrace();
                    send(ex, 500, "application/json",
                            "{\"reply\":" + jsonString("Erro ao falar com o modelo: " + e.getMessage()) + "}");
                }
            });

            server.start();
            System.out.println("Kairos web server a escutar em http://localhost:" + PORT + "/api/chat");
            System.out.println("Ctrl+C para parar.");
            Thread.currentThread().join();
        }
    }

    private static void addCors(HttpExchange ex) {
        var h = ex.getResponseHeaders();
        h.add("Access-Control-Allow-Origin", "*");
        h.add("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        h.add("Access-Control-Allow-Headers", "Content-Type");
    }

    private static void send(HttpExchange ex, int status, String contentType, String body) throws IOException {
        byte[] bytes = body.getBytes(StandardCharsets.UTF_8);
        ex.getResponseHeaders().add("Content-Type", contentType);
        ex.sendResponseHeaders(status, bytes.length);
        try (OutputStream os = ex.getResponseBody()) { os.write(bytes); }
    }

    private static final Pattern STRING_FIELD = Pattern.compile(
            "\"%s\"\\s*:\\s*\"((?:[^\"\\\\]|\\\\.)*)\"");

    private static String extractJsonString(String json, String key) {
        Matcher m = Pattern.compile(String.format(STRING_FIELD.pattern(), Pattern.quote(key))).matcher(json);
        if (!m.find()) return null;
        return m.group(1)
                .replace("\\\"", "\"")
                .replace("\\n", "\n")
                .replace("\\t", "\t")
                .replace("\\\\", "\\");
    }

    private static String jsonString(String s) {
        StringBuilder sb = new StringBuilder("\"");
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            switch (c) {
                case '"' -> sb.append("\\\"");
                case '\\' -> sb.append("\\\\");
                case '\n' -> sb.append("\\n");
                case '\r' -> sb.append("\\r");
                case '\t' -> sb.append("\\t");
                default -> {
                    if (c < 0x20) sb.append(String.format("\\u%04x", (int) c));
                    else sb.append(c);
                }
            }
        }
        return sb.append('"').toString();
    }
}
