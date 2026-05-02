package pt.kairos.maternal.tools;

import dev.langchain4j.agent.tool.Tool;
import dev.langchain4j.agent.tool.ToolMemoryId;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import pt.kairos.maternal.profile.LearnedFact;
import pt.kairos.maternal.profile.MotherProfile;
import pt.kairos.maternal.profile.MotherProfileRepository;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Tools de consulta ao perfil persistido. Read-only.
 * O LLM chama estas funções quando precisa de factos verificáveis sobre a mãe
 * em vez de adivinhar a partir do contexto da conversa.
 */
@ApplicationScoped
public class MaternalProfileTools {

    @Inject
    MotherProfileRepository repository;

    @Tool("Devolve o perfil completo da mãe (nome, locale, semana de gestação, "
            + "DUM, data prevista do parto, alergias, preferências). "
            + "Usa quando precisares de um retrato completo antes de responder.")
    public String getMotherProfile(@ToolMemoryId String motherId) {
        return repository.findById(motherId).map(this::formatProfile)
                .orElse("Sem perfil registado para " + motherId + ".");
    }

    @Tool("Devolve a semana de gestação actual da mãe (ou null se desconhecida).")
    public Integer getGestationalWeek(@ToolMemoryId String motherId) {
        return repository.findById(motherId).map(MotherProfile::getGestationalWeek).orElse(null);
    }

    @Tool("Devolve a lista de alergias conhecidas da mãe (vazia se nenhuma registada).")
    public List<String> getKnownAllergies(@ToolMemoryId String motherId) {
        return repository.findById(motherId).map(MotherProfile::getAllergies).orElse(List.of());
    }

    @Tool("Devolve os factos aprendidos sobre a mãe numa categoria específica. "
            + "Categorias válidas: GESTACAO, ALERGIA, PREFERENCIA, SINTOMA, HISTORICO, BEBE.")
    public List<String> getLearnedFacts(@ToolMemoryId String motherId, String category) {
        return repository.findById(motherId)
                .map(p -> p.getFacts().stream()
                        .filter(f -> category.equalsIgnoreCase(f.getCategory()))
                        .sorted((a, b) -> Double.compare(b.getConfidence(), a.getConfidence()))
                        .map(this::formatFact)
                        .collect(Collectors.toList()))
                .orElse(List.of());
    }

    private String formatProfile(MotherProfile p) {
        StringBuilder sb = new StringBuilder();
        sb.append("id=").append(p.getId());
        if (p.getName() != null) sb.append(", nome=").append(p.getName());
        if (p.getLocale() != null) sb.append(", locale=").append(p.getLocale());
        if (p.getGestationalWeek() != null) sb.append(", semana=").append(p.getGestationalWeek());
        if (p.getLastPeriodDate() != null) sb.append(", DUM=").append(p.getLastPeriodDate());
        if (p.getDueDate() != null) sb.append(", parto previsto=").append(p.getDueDate());
        if (!p.getAllergies().isEmpty()) sb.append(", alergias=").append(p.getAllergies());
        if (!p.getPreferences().isEmpty()) sb.append(", preferencias=").append(p.getPreferences());
        if (!p.getFacts().isEmpty()) {
            sb.append(", factos=[");
            sb.append(p.getFacts().stream().map(this::formatFact).collect(Collectors.joining("; ")));
            sb.append("]");
        }
        return sb.toString();
    }

    private String formatFact(LearnedFact f) {
        return f.getCategory() + "/" + f.getFactKey() + "=" + f.getFactValue()
                + " (conf=" + String.format("%.2f", f.getConfidence()) + ")";
    }
}
