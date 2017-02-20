declare module config {

    interface Environments {
        development: Configuration;
        test: Configuration;
        production: Configuration;
    }

    interface Configuration {
        client: string;
        connection?: string;
        server: ConfigurationServer;
        logger: ConfigurationLogger;
    }

    interface ConfigurationServer {
        host: string;
        port: string;
        graphiql: boolean;
    }

    interface ConfigurationLogger {
        host?: string;
        port?: string;
        file?: ConfigurationLoggerConsole;
        console: ConfigurationLoggerConsole;
        debug: string;
    }

    interface ConfigurationLoggerConsole {
        level: string;
    }
}
