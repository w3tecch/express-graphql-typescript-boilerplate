// Used to identify UserErrors
export const IsUserError = Symbol();

// UserErrors will be sent to the user
export class UserError extends Error {

    public code: string;

    static hasErrorCode(error: string): boolean;
    static hasErrorCode(error: Error): boolean;
    static hasErrorCode(error: any): boolean {
        let message = error;
        if (error.message) {
            message = error.message;
        }
        const reg = new RegExp('^[0-9]{3}: ');
        return reg.test(message);
    }

    static getErrorCode(message: string): string {
        if (UserError.hasErrorCode(message)) {
            return message.substring(0, 3);
        }
        return '000';
    }

    static getErrorMessage(message: string): string {
        if (UserError.hasErrorCode(message)) {
            return message.substring(5);
        }
        return message;
    }

    constructor(...args: any[]) {
        super(args[0]);
        this.name = 'Error';
        this.code = '000';
        this.message = args[0];
        this[IsUserError] = true;
        Error.captureStackTrace(this);
    }

    public toString(): string {
        return `${this.code}: ${this.message}`;
    }
}
