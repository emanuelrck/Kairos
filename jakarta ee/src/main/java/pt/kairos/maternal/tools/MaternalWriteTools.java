package pt.kairos.maternal.tools;

import dev.langchain4j.agent.tool.Tool;
import dev.langchain4j.agent.tool.ToolMemoryId;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import pt.kairos.maternal.profile.ProfileService;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;

/**
 * Tools de escrita clínica determinística. O LLM chama estas funções
 * sempre que a mãe partilhar um facto novo (semana de gestação, alergia,
 * sintoma, preferência). É a Kairos a registar activamente — não há
 * extracção async opaca a passar por trás.
 *
 * <p>Cada método é idempotente sempre que possível e devolve uma string
 * curta de confirmação para o LLM saber que a escrita teve sucesso.
 */
@ApplicationScoped
public class MaternalWriteTools {

    @Inject
    ProfileService profiles;

    @Tool("Regista o nome da mãe no perfil persistido. Usa quando ela se apresentar.")
    public String setMotherName(@ToolMemoryId String motherId, String name) {
        if (name == null || name.isBlank()) return "nome inválido, não foi registado";
        profiles.setName(motherId, name.trim());
        return "ok: nome '" + name + "' registado";
    }

    @Tool("Regista a semana de gestação actual da mãe (entre 1 e 42).")
    public String setGestationalWeek(@ToolMemoryId String motherId, int week) {
        if (week < 1 || week > 42) return "semana fora do intervalo válido (1-42), não foi registada";
        profiles.setGestationalWeek(motherId, week);
        return "ok: semana " + week + " registada";
    }

    @Tool("Regista a data da última menstruação (DUM) em formato ISO yyyy-MM-dd. "
            + "Calcula automaticamente a data prevista do parto (DUM + 280 dias) e "
            + "actualiza a semana de gestação derivada.")
    public String setLastPeriodDate(@ToolMemoryId String motherId, String lastPeriodDateIso) {
        if (lastPeriodDateIso == null || lastPeriodDateIso.isBlank()) return "data vazia, não foi registada";
        try {
            LocalDate dum = LocalDate.parse(lastPeriodDateIso.trim());
            if (dum.isAfter(LocalDate.now())) return "data está no futuro, não foi registada";
            if (dum.isBefore(LocalDate.now().minusDays(310))) return "data demasiado antiga (>310 dias), não foi registada";
            profiles.setLastPeriodDate(motherId, dum);
            return "ok: DUM " + dum + " registada (data prevista do parto " + dum.plusDays(280) + ")";
        } catch (DateTimeParseException e) {
            return "formato de data inválido (esperado yyyy-MM-dd), não foi registada";
        }
    }

    @Tool("Regista uma alergia conhecida (ex.: 'penicilina', 'frutos secos'). "
            + "Idempotente — se a alergia já existir, não duplica.")
    public String recordAllergy(@ToolMemoryId String motherId, String substance) {
        if (substance == null || substance.isBlank()) return "substância vazia, não foi registada";
        profiles.addAllergy(motherId, substance.trim());
        return "ok: alergia a '" + substance + "' registada";
    }

    @Tool("Regista um sintoma que a mãe relatou (ex.: 'enjoos matinais', 'azia nocturna'). "
            + "Severity deve ser 'ligeiro', 'moderado' ou 'severo'. Guarda timestamp automaticamente.")
    public String recordSymptom(@ToolMemoryId String motherId, String symptom, String severity) {
        if (symptom == null || symptom.isBlank()) return "sintoma vazio, não foi registado";
        String sev = (severity == null || severity.isBlank()) ? "não-especificado" : severity.trim();
        profiles.recordFact(motherId, "SINTOMA", symptom.trim(), sev, 0.95);
        return "ok: sintoma '" + symptom + "' (" + sev + ") registado";
    }

    @Tool("Regista uma preferência da mãe (ex.: chave='dieta' valor='vegetariana', "
            + "chave='comunicacao' valor='tom calmo'). Substitui o valor anterior se a chave já existir.")
    public String recordPreference(@ToolMemoryId String motherId, String key, String value) {
        if (key == null || key.isBlank() || value == null || value.isBlank()) {
            return "chave ou valor vazios, preferência não registada";
        }
        profiles.recordPreference(motherId, key.trim().toLowerCase(), value.trim());
        return "ok: preferência '" + key + "=" + value + "' registada";
    }

    @Tool("Regista um facto clínico ou histórico genérico no perfil da mãe. "
            + "Categorias válidas: GESTACAO, HISTORICO, BEBE. "
            + "Para alergias, sintomas ou preferências, usa as tools específicas. "
            + "Confidence em [0.0, 1.0] (1.0 = a mãe afirmou directamente).")
    public String recordFact(@ToolMemoryId String motherId, String category, String key, String value, double confidence) {
        if (category == null || key == null || value == null) return "campos obrigatórios em falta";
        profiles.recordFact(motherId, category.trim().toUpperCase(), key.trim().toLowerCase(), value.trim(), confidence);
        return "ok: facto " + category + "/" + key + " registado (conf=" + confidence + ")";
    }
}
