import { UserException } from '../../../src/exceptions';


describe('UserError', () => {
    describe('hasErrorCode', () => {
        it('should return true if the given error has an error code in his message', () => {
            expect(UserException.hasErrorCode('111: Test')).toBeTruthy();
            expect(UserException.hasErrorCode(new Error('111: Test'))).toBeTruthy();
        });
        it('should return false if the given error has no error code in his message', () => {
            expect(UserException.hasErrorCode('Test')).toBeFalsy();
            expect(UserException.hasErrorCode(new Error('Test'))).toBeFalsy();
        });
        it('should return false if the given error has an invalid error code in his message', () => {
            expect(UserException.hasErrorCode('0: Test')).toBeFalsy();
            expect(UserException.hasErrorCode('00: Test')).toBeFalsy();
            expect(UserException.hasErrorCode('000 Test')).toBeFalsy();
            expect(UserException.hasErrorCode('000:Test')).toBeFalsy();
            expect(UserException.hasErrorCode('00A: Test')).toBeFalsy();
            expect(UserException.hasErrorCode('0A0: Test')).toBeFalsy();
            expect(UserException.hasErrorCode('A00: Test')).toBeFalsy();
        });
    });
    describe('getErrorCode', () => {
        it('should return the error code of the given message', () => {
            expect(UserException.getErrorCode('111: Test')).toBe('111');
        });
        it('should return 000 for an unknown error', () => {
            expect(UserException.getErrorCode('Test')).toBe('000');
        });
    });
    describe('getErrorMessage', () => {
        it('should return the message without the error code', () => {
            expect(UserException.getErrorMessage('000: message')).toBe('message');
            expect(UserException.getErrorMessage('message')).toBe('message');
        });
    });
});
