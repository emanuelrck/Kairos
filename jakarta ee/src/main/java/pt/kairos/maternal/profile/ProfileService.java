package pt.kairos.maternal.profile;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import pt.kairos.maternal.ai.ExtractedFacts;
import pt.kairos.maternal.ai.LearnedFactDto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@ApplicationScoped
public class ProfileService {

    @Inject
    MotherProfileRepository repository;

    @Inject
    ContextRenderer renderer;

    @Inject
    @ConfigProperty(name = "kairos.profile.default-locale", defaultValue = "pt-PT")
    String defaultLocale;

    @Inject
    @ConfigProperty(name = "kairos.learning.min-confidence", defaultValue = "0.6")
    double minConfidence;

    public MotherProfile loadOrCreate(String motherId) {
        return repository.findById(motherId).orElseGet(() -> {
            MotherProfile fresh = new MotherProfile(motherId);
            fresh.setLocale(defaultLocale);
            return repository.save(fresh);
        });
    }

    public String renderContext(String motherId) {
        return repository.findById(motherId)
                .map(renderer::render)
                .orElse(renderer.render(null));
    }

    // ---------- Métodos atómicos chamados pelas tools (escrita determinística) ----------

    public void setName(String motherId, String name) {
        mutate(motherId, p -> p.setName(name));
    }

    public void setGestationalWeek(String motherId, int week) {
        mutate(motherId, p -> p.setGestationalWeek(week));
    }

    public void setLastPeriodDate(String motherId, LocalDate dum) {
        mutate(motherId, p -> {
            p.setLastPeriodDate(dum);
            // Regra de Naegele: DUM + 280 dias.
            p.setDueDate(dum.plusDays(280));
            // Semana actual derivada da DUM.
            long days = java.time.temporal.ChronoUnit.DAYS.between(dum, LocalDate.now());
            if (days >= 0 && days <= 300) {
                p.setGestationalWeek((int) (days / 7));
            }
        });
    }

    public void addAllergy(String motherId, String substance) {
        mutate(motherId, p -> {
            if (substance != null && !substance.isBlank()
                    && p.getAllergies().stream().noneMatch(a -> a.equalsIgnoreCase(substance))) {
                p.getAllergies().add(substance);
            }
        });
    }

    public void recordPreference(String motherId, String key, String value) {
        mutate(motherId, p -> p.getPreferences().put(key, value));
    }

    public void recordFact(String motherId, String category, String key, String value, double confidence) {
        if (confidence < minConfidence || isBlank(category) || isBlank(key) || isBlank(value)) return;
        repository.inTxRun(em -> {
            MotherProfile managed = loadManaged(em, motherId);
            Optional<LearnedFact> existing = findExisting(managed.getFacts(), category, key);
            if (existing.isPresent()) {
                LearnedFact f = existing.get();
                if (confidence >= f.getConfidence()) {
                    f.setFactValue(value);
                    f.setConfidence(confidence);
                    f.setLearnedAt(LocalDateTime.now());
                }
            } else {
                managed.getFacts().add(new LearnedFact(managed, category, key, value, confidence));
            }
            managed.setUpdatedAt(LocalDateTime.now());
            return null;
        });
    }

    /** Mantido para o {@code LearningExtractor} async (Phase 2). Não usado pelo CLI actual. */
    public void absorbFacts(String motherId, ExtractedFacts extracted) {
        if (extracted == null || extracted.facts() == null || extracted.facts().isEmpty()) return;
        for (LearnedFactDto dto : extracted.facts()) {
            if (dto == null) continue;
            recordFact(motherId, dto.category(), dto.key(), dto.value(), dto.confidence());
        }
    }

    // ---------- Helpers ----------

    private void mutate(String motherId, java.util.function.Consumer<MotherProfile> change) {
        repository.inTxRun(em -> {
            MotherProfile managed = loadManaged(em, motherId);
            change.accept(managed);
            managed.setUpdatedAt(LocalDateTime.now());
            return null;
        });
    }

    private MotherProfile loadManaged(jakarta.persistence.EntityManager em, String motherId) {
        MotherProfile managed = em.find(MotherProfile.class, motherId);
        if (managed == null) {
            managed = new MotherProfile(motherId);
            managed.setLocale(defaultLocale);
            em.persist(managed);
        }
        return managed;
    }

    private Optional<LearnedFact> findExisting(List<LearnedFact> facts, String category, String key) {
        return facts.stream()
                .filter(f -> category.equalsIgnoreCase(f.getCategory()) && key.equalsIgnoreCase(f.getFactKey()))
                .findFirst();
    }

    private static boolean isBlank(String s) {
        return s == null || s.isBlank();
    }
}
