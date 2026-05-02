package pt.kairos.maternal.tools;

import dev.langchain4j.agent.tool.Tool;
import dev.langchain4j.agent.tool.ToolMemoryId;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import pt.kairos.maternal.profile.MotherProfile;
import pt.kairos.maternal.profile.MotherProfileRepository;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.time.temporal.ChronoUnit;

/**
 * Tools de cálculos temporais. LLMs são pouco fiáveis em aritmética de datas;
 * estas funções dão respostas determinísticas baseadas na regra de Naegele
 * (DUM + 280 dias = data prevista do parto).
 *
 * <p>Aceitam datas em formato ISO {@code yyyy-MM-dd}. Se o LLM enviar outro
 * formato, devolve mensagem de erro estruturada (não atira excepção).
 */
@ApplicationScoped
public class MaternalDateTools {

    @Inject
    MotherProfileRepository repository;

    @Tool("Calcula a semana de gestação actual a partir da data da última menstruação (DUM). "
            + "A data deve estar em formato ISO yyyy-MM-dd. "
            + "Devolve um inteiro entre 0 e 42, ou -1 se a data for inválida ou estiver fora do intervalo.")
    public int calculateGestationalAge(String lastPeriodDateIso) {
        LocalDate dum = parseDate(lastPeriodDateIso);
        if (dum == null) return -1;
        long days = ChronoUnit.DAYS.between(dum, LocalDate.now());
        if (days < 0 || days > 300) return -1;
        return (int) (days / 7);
    }

    @Tool("Calcula a data prevista do parto a partir da data da última menstruação (DUM), "
            + "usando a regra de Naegele (DUM + 280 dias). "
            + "Devolve a data em formato ISO yyyy-MM-dd, ou 'data inválida' se a entrada for inválida.")
    public String estimateDueDate(String lastPeriodDateIso) {
        LocalDate dum = parseDate(lastPeriodDateIso);
        if (dum == null) return "data inválida";
        return dum.plusDays(280).toString();
    }

    @Tool("Devolve quantos dias faltam até à data prevista do parto desta mãe, "
            + "lendo a data guardada no perfil. Devolve número negativo se a data já passou. "
            + "Devolve -9999 se não houver data prevista guardada.")
    public long daysUntilDueDate(@ToolMemoryId String motherId) {
        return repository.findById(motherId)
                .map(MotherProfile::getDueDate)
                .map(due -> ChronoUnit.DAYS.between(LocalDate.now(), due))
                .orElse(-9999L);
    }

    private LocalDate parseDate(String iso) {
        if (iso == null || iso.isBlank()) return null;
        try {
            return LocalDate.parse(iso.trim());
        } catch (DateTimeParseException e) {
            return null;
        }
    }
}
