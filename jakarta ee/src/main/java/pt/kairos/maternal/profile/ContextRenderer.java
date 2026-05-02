package pt.kairos.maternal.profile;

import jakarta.enterprise.context.ApplicationScoped;

import java.util.StringJoiner;

/**
 * Converte um {@link MotherProfile} num bloco de texto para injectar em {@code {{motherContext}}}
 * dentro do system prompt da Kairos.
 */
@ApplicationScoped
public class ContextRenderer {

    public String render(MotherProfile profile) {
        if (profile == null) {
            return "(sem contexto pessoal ainda — pergunta com gentileza para conheceres a mãe)";
        }

        StringBuilder sb = new StringBuilder();
        sb.append("Mãe: ").append(profile.getName() == null ? "(nome desconhecido)" : profile.getName());
        if (profile.getLocale() != null) {
            sb.append(", locale ").append(profile.getLocale());
        }
        if (profile.getGestationalWeek() != null) {
            sb.append(", semana ").append(profile.getGestationalWeek()).append(" de gestação");
        }
        sb.append(".\n");

        if (profile.getLastPeriodDate() != null) {
            sb.append("Data da última menstruação (DUM): ").append(profile.getLastPeriodDate()).append("\n");
        }
        if (profile.getDueDate() != null) {
            sb.append("Data prevista do parto: ").append(profile.getDueDate()).append("\n");
        }

        if (profile.getAllergies() != null && !profile.getAllergies().isEmpty()) {
            StringJoiner sj = new StringJoiner(", ");
            profile.getAllergies().forEach(sj::add);
            sb.append("Alergias conhecidas: ").append(sj).append(".\n");
        }

        if (profile.getPreferences() != null && !profile.getPreferences().isEmpty()) {
            sb.append("Preferências:\n");
            profile.getPreferences().forEach((k, v) ->
                    sb.append(" - ").append(k).append(" = ").append(v).append('\n'));
        }

        if (profile.getFacts() != null && !profile.getFacts().isEmpty()) {
            sb.append("Factos aprendidos:\n");
            profile.getFacts().stream()
                    .sorted((a, b) -> Double.compare(b.getConfidence(), a.getConfidence()))
                    .limit(20)
                    .forEach(f -> sb.append(" - ")
                            .append(f.getCategory()).append('/')
                            .append(f.getFactKey()).append(" = ")
                            .append(f.getFactValue())
                            .append(" (").append(String.format("%.2f", f.getConfidence())).append(")\n"));
        }

        return sb.toString();
    }
}
