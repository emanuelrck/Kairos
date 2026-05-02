package pt.kairos.maternal;

import jakarta.ws.rs.ApplicationPath;
import jakarta.ws.rs.core.Application;

/**
 * JAX-RS Application root.
 *
 * Ponto de entrada do WAR (Phase 2). Em modo CLI este ficheiro não é usado,
 * mas mantém-se para que o mesmo artefacto possa ser empacotado como WAR e
 * implantado num app server Jakarta EE 11 sem alterações.
 */
@ApplicationPath("api")
public class KnowMeEngine extends Application {
}
