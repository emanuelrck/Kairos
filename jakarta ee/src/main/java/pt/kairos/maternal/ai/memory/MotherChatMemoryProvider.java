package pt.kairos.maternal.ai.memory;

import dev.langchain4j.memory.chat.ChatMemoryProvider;
import dev.langchain4j.memory.chat.MessageWindowChatMemory;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.inject.Produces;
import jakarta.inject.Named;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import jakarta.inject.Inject;

/**
 * Produz um {@link ChatMemoryProvider} nomeado, que o {@code KairosAssistant}
 * referencia via {@code chatMemoryProviderName = "motherChatMemoryProvider"}.
 *
 * <p>Cada {@code memoryId} (== motherId) recebe a sua própria janela de
 * mensagens em RAM. A memória de longo prazo vive no {@code LearnedFact}/JPA.
 */
@ApplicationScoped
public class MotherChatMemoryProvider {

    @Inject
    @ConfigProperty(name = "kairos.memory.max-messages", defaultValue = "20")
    int maxMessages;

    @Produces
    @ApplicationScoped
    @Named("motherChatMemoryProvider")
    public ChatMemoryProvider produce() {
        return memoryId -> MessageWindowChatMemory.withMaxMessages(maxMessages);
    }
}
