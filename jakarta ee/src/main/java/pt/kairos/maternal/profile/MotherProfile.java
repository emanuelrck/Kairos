package pt.kairos.maternal.profile;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.MapKeyColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Entity
@Table(name = "mother_profile")
public class MotherProfile {

    @Id
    private String id;

    private String name;

    private String locale;

    private Integer gestationalWeek;

    private LocalDate lastPeriodDate;

    private LocalDate dueDate;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> allergies = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @MapKeyColumn(name = "pref_key")
    @Column(name = "pref_value")
    private Map<String, String> preferences = new HashMap<>();

    @OneToMany(mappedBy = "profile", cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    private List<LearnedFact> facts = new ArrayList<>();

    private LocalDateTime updatedAt;

    public MotherProfile() {
    }

    public MotherProfile(String id) {
        this.id = id;
        this.updatedAt = LocalDateTime.now();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getLocale() { return locale; }
    public void setLocale(String locale) { this.locale = locale; }

    public Integer getGestationalWeek() { return gestationalWeek; }
    public void setGestationalWeek(Integer gestationalWeek) { this.gestationalWeek = gestationalWeek; }

    public LocalDate getLastPeriodDate() { return lastPeriodDate; }
    public void setLastPeriodDate(LocalDate lastPeriodDate) { this.lastPeriodDate = lastPeriodDate; }

    public LocalDate getDueDate() { return dueDate; }
    public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }

    public List<String> getAllergies() { return allergies; }
    public void setAllergies(List<String> allergies) { this.allergies = allergies; }

    public Map<String, String> getPreferences() { return preferences; }
    public void setPreferences(Map<String, String> preferences) { this.preferences = preferences; }

    public List<LearnedFact> getFacts() { return facts; }
    public void setFacts(List<LearnedFact> facts) { this.facts = facts; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
