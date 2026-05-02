package pt.kairos.maternal.profile;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.time.LocalDateTime;

@Entity
@Table(name = "learned_fact")
public class LearnedFact {

    @Id
    @SequenceGenerator(name = "learned_fact_seq", sequenceName = "learned_fact_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "learned_fact_seq")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "profile_id")
    private MotherProfile profile;

    private String category;

    private String factKey;

    private String factValue;

    private double confidence;

    private LocalDateTime learnedAt;

    public LearnedFact() {
    }

    public LearnedFact(MotherProfile profile, String category, String factKey, String factValue, double confidence) {
        this.profile = profile;
        this.category = category;
        this.factKey = factKey;
        this.factValue = factValue;
        this.confidence = confidence;
        this.learnedAt = java.time.LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public MotherProfile getProfile() { return profile; }
    public void setProfile(MotherProfile profile) { this.profile = profile; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getFactKey() { return factKey; }
    public void setFactKey(String factKey) { this.factKey = factKey; }

    public String getFactValue() { return factValue; }
    public void setFactValue(String factValue) { this.factValue = factValue; }

    public double getConfidence() { return confidence; }
    public void setConfidence(double confidence) { this.confidence = confidence; }

    public LocalDateTime getLearnedAt() { return learnedAt; }
    public void setLearnedAt(LocalDateTime learnedAt) { this.learnedAt = learnedAt; }
}
