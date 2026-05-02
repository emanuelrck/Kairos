package pt.kairos.maternal.rest;

import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import pt.kairos.maternal.ai.KairosAssistant;
import pt.kairos.maternal.profile.ProfileService;

@Path("chat")
public class ChatResource {

    private static final String DEFAULT_MOTHER_ID = "web-maria";

    private static final String BREVITY_HINT = """

            Estilo de resposta para esta interface (web/mobile):
              - Máx 2-3 frases curtas. Sem listas, sem títulos, sem markdown.
              - Tom directo e caloroso, sem disclaimers repetidos.
              - Não confirmes registos no fim — guarda em silêncio.
            """;

    @Inject
    KairosAssistant assistant;

    @Inject
    ProfileService profileService;

    public record ChatRequest(String message, String motherId) {}
    public record ChatResponse(String reply) {}

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response chat(ChatRequest req) {
        if (req == null || req.message() == null || req.message().isBlank()) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(new ChatResponse("Mensagem vazia.")).build();
        }
        String motherId = (req.motherId() == null || req.motherId().isBlank())
                ? DEFAULT_MOTHER_ID : req.motherId();

        profileService.loadOrCreate(motherId);
        String context = profileService.renderContext(motherId) + BREVITY_HINT;

        String reply = assistant.chat(motherId, req.message(), context);
        return Response.ok(new ChatResponse(reply)).build();
    }
}
