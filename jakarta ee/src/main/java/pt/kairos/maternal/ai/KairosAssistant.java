package pt.kairos.maternal.ai;

import dev.langchain4j.cdi.spi.RegisterAIService;
import dev.langchain4j.service.MemoryId;
import dev.langchain4j.service.SystemMessage;
import dev.langchain4j.service.UserMessage;
import dev.langchain4j.service.V;
import jakarta.enterprise.context.ApplicationScoped;
import pt.kairos.maternal.tools.MaternalDateTools;
import pt.kairos.maternal.tools.MaternalProfileTools;
import pt.kairos.maternal.tools.MaternalWriteTools;

/**
 * Interface AI service principal — implementação gerada pelo LangChain4j-CDI.
 *
 * <p>Hint #3 do PDF: o {@link SystemMessage} traz os guardrails da Kairos
 * (âmbito materno, regras de não-diagnóstico, "Não tenho a certeza", emergência).
 *
 * <p>O placeholder {@code {{motherContext}}} é preenchido pelo argumento
 * marcado com {@code @V("motherContext")} a cada chamada — é assim que o
 * "Know-Me filter" (hint #4) injecta o perfil persistido no prompt.
 */
@RegisterAIService(
        scope = ApplicationScoped.class,
        chatModelName = "chat-model",
        chatMemoryProviderName = "motherChatMemoryProvider",
        tools = { MaternalProfileTools.class, MaternalDateTools.class, MaternalWriteTools.class }
)
public interface KairosAssistant {

    @SystemMessage(MaternalSystemPrompts.MAIN_PT)
    String chat(@MemoryId String motherId,
                @UserMessage String message,
                @V("motherContext") String motherContext);

    @SystemMessage(MaternalSystemPrompts.STRUCTURED_PT)
    MaternalAdvice adviseStructured(@MemoryId String motherId,
                                    @UserMessage String message,
                                    @V("motherContext") String motherContext);
}
