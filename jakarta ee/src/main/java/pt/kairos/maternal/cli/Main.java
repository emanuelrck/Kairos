package pt.kairos.maternal.cli;

import org.jboss.weld.environment.se.Weld;
import org.jboss.weld.environment.se.WeldContainer;
import pt.kairos.maternal.ai.KairosAssistant;
import pt.kairos.maternal.profile.ProfileService;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Entry-point CLI da Kairos. Arranca um contentor Weld SE (CDI) e abre uma
 * REPL contra o {@link KairosAssistant}. Os mesmos beans CDI vão funcionar
 * mais tarde dentro de um WAR Jakarta EE — só muda quem hospeda o contentor.
 */
public final class Main {

    public static void main(String[] args) {
        if (System.getenv("OPENAI_API_KEY") == null || System.getenv("OPENAI_API_KEY").isBlank()) {
            System.err.println("""
                    [aviso] A variável de ambiente OPENAI_API_KEY não está definida.
                            Define-a antes de correr (PowerShell):
                              $env:OPENAI_API_KEY = "sk-..."
                            Ou usa o modelo simulado:
                              -Ddev.langchain4j.cdi.plugin.chat-model.class=pt.kairos.maternal.model.chat.MockChatModel
                    """);
        }

        CliArgs cli = CliArgs.parse(args);

        try (WeldContainer container = new Weld().initialize()) {
            KairosAssistant assistant = container.select(KairosAssistant.class).get();
            ProfileService profiles = container.select(ProfileService.class).get();

            profiles.loadOrCreate(cli.motherId());

            System.out.println();
            System.out.println("====================================================");
            System.out.println("  Kairos — assistente de saúde materna (CLI)");
            System.out.println("  Sessão para mãe: " + cli.motherId());
            System.out.println("  Escreve 'sair' para terminar.");
            System.out.println("====================================================");
            System.out.println();

            try (BufferedReader in = new BufferedReader(new InputStreamReader(System.in, StandardCharsets.UTF_8))) {
                while (true) {
                    System.out.print("Tu> ");
                    String line = in.readLine();
                    if (line == null) break;
                    line = line.trim();
                    if (line.isEmpty()) continue;
                    if ("sair".equalsIgnoreCase(line) || "exit".equalsIgnoreCase(line)) break;

                    String ctx = profiles.renderContext(cli.motherId());

                    String reply;
                    try {
                        reply = assistant.chat(cli.motherId(), line, ctx);
                    } catch (RuntimeException e) {
                        System.err.println("[erro ao falar com o modelo] " + e.getMessage());
                        Throwable cause = e.getCause();
                        while (cause != null) {
                            System.err.println("  causado por: " + cause.getClass().getSimpleName() + ": " + cause.getMessage());
                            cause = cause.getCause();
                        }
                        continue;
                    }

                    System.out.println();
                    System.out.println("Kairos> " + reply);
                    System.out.println();
                    // A escrita clínica acontece dentro do chat() via tools — sem extracção async.
                }
            } catch (Exception e) {
                System.err.println("[erro] " + e.getMessage());
            }

            System.out.println("Até breve. Cuida-te. 💛");
        }
    }
}
