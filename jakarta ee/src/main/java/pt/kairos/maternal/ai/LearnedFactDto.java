package pt.kairos.maternal.ai;

/**
 * Facto extraído de uma mensagem da mãe pelo {@link LearningExtractor}.
 *
 * Categorias válidas: GESTACAO, ALERGIA, PREFERENCIA, SINTOMA, HISTORICO, BEBE.
 * Confidence em [0.0, 1.0].
 */
public record LearnedFactDto(
        String category,
        String key,
        String value,
        double confidence
) {}
