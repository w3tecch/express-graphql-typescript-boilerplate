// Used to identify UserErrors
export const IsException = Symbol();

// UserErrors will be sent to the user
export class Exception extends Error {

    static Seperator = ':';
    static Name = 'UnkownException';
    static Key = 'e_unkown';

    public name: string;
    public key: string;

    static hasKey(error: string): boolean;
    static hasKey(error: Error): boolean;
    static hasKey(error: any): boolean {
        let message = error;
        if (error.message) {
            message = error.message;
        }
        const reg = new RegExp('^[a-zA-Z]+:[a-z_]+:');
        return reg.test(message);
    }

    static getName(message: string): string {
        if (Exception.hasKey(message)) {
            return message.split(Exception.Seperator)[0];
        }
        return Exception.Name;
    }

    static getKey(message: string): string {
        if (Exception.hasKey(message)) {
            return message.split(Exception.Seperator)[1];
        }
        return Exception.Key;
    }

    static getMessage(message: string): string {
        if (Exception.hasKey(message)) {
            return message.split(Exception.Seperator)[2];
        }
        return message;
    }

    constructor(...args: any[]) {
        super(args[0]);
        this.name = Exception.Name;
        this.key = Exception.Key;
        this.message = args[0];
        this[IsException] = true;
        Error.captureStackTrace(this);
    }

    public toString(): string {
        return `${this.name}:${this.key}:${this.message}`;
    }
}
