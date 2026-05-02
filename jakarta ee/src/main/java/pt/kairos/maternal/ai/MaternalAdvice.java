package pt.kairos.maternal.ai;

import java.util.List;

/**
 * Resposta estruturada (hint #2 do PDF — JSON-B / record).
 * Usada quando precisamos de saída deserializável em vez de prosa livre.
 */
public record MaternalAdvice(
        String summary,
        List<String> bullets,
        List<String> warnings,
        List<String> sources
) {}
