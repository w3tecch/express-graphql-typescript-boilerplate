declare module config {
    interface Config {
        host: string;
        port: string;
        database: string;
        logger: ConfigLogger;
    }

    interface ConfigLogger {
        host?: string;
        port?: string;
        file?: ConfigLoggerConsole
        console: ConfigLoggerConsole
    }

    interface ConfigLoggerConsole {
        level: string
    }
}
