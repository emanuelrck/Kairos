package pt.kairos.maternal.profile;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.EntityTransaction;
import jakarta.persistence.Persistence;

import java.util.Optional;
import java.util.function.Consumer;
import java.util.function.Function;

/**
 * Wrapper de EntityManager para o modo CLI (RESOURCE_LOCAL).
 * Em Phase 2 (WAR), substitui-se por @PersistenceContext directo.
 */
@ApplicationScoped
public class MotherProfileRepository {

    private static final String PU_NAME = "kairos-cli";

    private EntityManagerFactory emf;

    @PostConstruct
    void init() {
        this.emf = Persistence.createEntityManagerFactory(PU_NAME);
    }

    @PreDestroy
    void shutdown() {
        if (emf != null && emf.isOpen()) {
            emf.close();
        }
    }

    public Optional<MotherProfile> findById(String id) {
        return inTx(em -> Optional.ofNullable(em.find(MotherProfile.class, id)));
    }

    public MotherProfile save(MotherProfile profile) {
        return inTxRun((Function<EntityManager, MotherProfile>) em -> em.merge(profile));
    }

    /** Read-only block (no transaction needed for finds, but keep EM lifecycle clean). */
    public <T> T inTx(Function<EntityManager, T> work) {
        EntityManager em = emf.createEntityManager();
        try {
            return work.apply(em);
        } finally {
            em.close();
        }
    }

    /** Mutating block — wraps a transaction. */
    public <T> T inTxRun(Function<EntityManager, T> work) {
        EntityManager em = emf.createEntityManager();
        EntityTransaction tx = em.getTransaction();
        try {
            tx.begin();
            T result = work.apply(em);
            tx.commit();
            return result;
        } catch (RuntimeException e) {
            if (tx.isActive()) tx.rollback();
            throw e;
        } finally {
            em.close();
        }
    }

    public void inTxRun(Consumer<EntityManager> work) {
        inTxRun(em -> { work.accept(em); return null; });
    }
}
