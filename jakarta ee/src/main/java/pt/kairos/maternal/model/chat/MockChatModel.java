package pt.kairos.maternal.model.chat;

import dev.langchain4j.data.message.AiMessage;
import dev.langchain4j.model.chat.ChatModel;
import dev.langchain4j.model.chat.request.ChatRequest;
import dev.langchain4j.model.chat.response.ChatResponse;

/**
 * Modelo simulado — devolve respostas fixas, sem chamar a OpenAI.
 *
 * <p>Suporta a hint #1 do PDF (LLMs plugáveis via CDI). Para activá-lo,
 * sobrepõe a propriedade {@code dev.langchain4j.cdi.plugin.chat-model.class}:
 *
 * <pre>
 * mvn exec:java -Ddev.langchain4j.cdi.plugin.chat-model.class=pt.kairos.maternal.model.chat.MockChatModel
 * </pre>
 *
 * O LangChain4j-CDI procura uma classe com {@code builder()} ou um construtor
 * sem argumentos; este modelo expõe um construtor padrão para essa convenção.
 */
public class MockChatModel implements ChatModel {

    public MockChatModel() {
    }

    @Override
    public ChatResponse chat(ChatRequest chatRequest) {
        String reply = "[mock] Recebi a tua mensagem. (Modelo simulado activo — sem chamada à OpenAI.)";
        return ChatResponse.builder()
                .aiMessage(AiMessage.from(reply))
                .build();
    }
}
