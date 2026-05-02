package pt.kairos.maternal.ai;

import dev.langchain4j.cdi.spi.RegisterAIService;
import dev.langchain4j.service.SystemMessage;
import dev.langchain4j.service.UserMessage;
import jakarta.enterprise.context.ApplicationScoped;

/**
 * Segundo AI service — depois de cada turno, extrai factos estruturados
 * da mensagem da mãe para alimentar o {@code MotherProfile} (hint #4).
 *
 * <p>Devolve um {@link ExtractedFacts} (record JSON-B, hint #2) que o
 * {@code ProfileService} absorve, fechando o ciclo de aprendizagem.
 */
@RegisterAIService(
        scope = ApplicationScoped.class,
        chatModelName = "chat-model"
)
public interface LearningExtractor {

    @SystemMessage(MaternalSystemPrompts.LEARNING_EXTRACTOR_PT)
    ExtractedFacts extract(@UserMessage String latestUserMessage);
}
