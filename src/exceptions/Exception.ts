/**
 * Annotaion '@exception' to give the exception a name and a key
 */
export const exception = <Exception extends { new (...args: any[]): {} }>(constructor: Exception) => {
    return class extends constructor {
        name = constructor.name;
    };
};

// Used to identify UserErrors
export const IsException = Symbol();

// UserErrors will be sent to the user
export class Exception extends Error {

    static Seperator = ':';
    static Name = 'UnkownException';

    static hasName(error: string): boolean;
    static hasName(error: Error): boolean;
    static hasName(error: any): boolean {
        let message = error;
        if (error.message) {
            message = error.message;
        }
        const reg = new RegExp('^[a-zA-Z]+:');
        return reg.test(message);
    }

    static getName(message: string): string {
        if (Exception.hasName(message)) {
            return message.split(Exception.Seperator)[0];
        }
        return Exception.Name;
    }

    static getMessage(message: string): string {
        if (Exception.hasName(message)) {
            return message.split(Exception.Seperator)[1];
        }
        return message;
    }

    constructor(...args: any[]) {
        super(args[0]);
        this.name = Exception.Name;
        this.message = args[0];
        this[IsException] = true;
        Error.captureStackTrace(this);
    }

    public toString(): string {
        return `${this.constructor.name}:${this.message}`;
    }
}
