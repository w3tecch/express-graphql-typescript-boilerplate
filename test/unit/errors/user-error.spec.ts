import { UserError } from '../../../src/errors/user.error';


describe('UserError', () => {
    describe('hasErrorCode', () => {
        it('should return true if the given error has an error code in his message', () => {
            expect(UserError.hasErrorCode('111: Test')).toBeTruthy();
            expect(UserError.hasErrorCode(new Error('111: Test'))).toBeTruthy();
        });
        it('should return false if the given error has no error code in his message', () => {
            expect(UserError.hasErrorCode('Test')).toBeFalsy();
            expect(UserError.hasErrorCode(new Error('Test'))).toBeFalsy();
        });
        it('should return false if the given error has an invalid error code in his message', () => {
            expect(UserError.hasErrorCode('0: Test')).toBeFalsy();
            expect(UserError.hasErrorCode('00: Test')).toBeFalsy();
            expect(UserError.hasErrorCode('000 Test')).toBeFalsy();
            expect(UserError.hasErrorCode('000:Test')).toBeFalsy();
            expect(UserError.hasErrorCode('00A: Test')).toBeFalsy();
            expect(UserError.hasErrorCode('0A0: Test')).toBeFalsy();
            expect(UserError.hasErrorCode('A00: Test')).toBeFalsy();
        });
    });
    describe('getErrorCode', () => {
        it('should return the error code of the given message', () => {
            expect(UserError.getErrorCode('111: Test')).toBe('111');
        });
        it('should return 000 for an unknown error', () => {
            expect(UserError.getErrorCode('Test')).toBe('000');
        });
    });
    describe('getErrorMessage', () => {
        it('should return the message without the error code', () => {
            expect(UserError.getErrorMessage('000: message')).toBe('message');
            expect(UserError.getErrorMessage('message')).toBe('message');
        });
    });
});
