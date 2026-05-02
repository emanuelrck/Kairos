package pt.kairos.maternal.cli;

public record CliArgs(String motherId) {

    public static CliArgs parse(String[] args) {
        String motherId = "demo-ana";
        for (int i = 0; i < args.length; i++) {
            String a = args[i];
            if (("--mother".equals(a) || "-m".equals(a)) && i + 1 < args.length) {
                motherId = args[++i];
            } else if (a.startsWith("--mother=")) {
                motherId = a.substring("--mother=".length());
            } else if ("--help".equals(a) || "-h".equals(a)) {
                printUsageAndExit(0);
            }
        }
        return new CliArgs(motherId);
    }

    private static void printUsageAndExit(int code) {
        System.out.println("""
                Uso: mvn exec:java -Dexec.mainClass=pt.kairos.maternal.cli.Main \\
                                   -Dexec.args="--mother <id>"

                Opções:
                  --mother, -m <id>    Identificador da mãe (default: demo-ana)
                  --help, -h           Mostra esta mensagem
                """);
        System.exit(code);
    }
}
