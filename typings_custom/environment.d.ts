declare module environment {
    interface Configuration {
        host: string;
        port: string;
        database: string;
        debug: string;
        logger: ConfigurationLogger;
    }

    interface ConfigurationLogger {
        host?: string;
        port?: string;
        file?: ConfigurationLoggerConsole
        console: ConfigurationLoggerConsole
    }

    interface ConfigurationLoggerConsole {
        level: string
    }
}
