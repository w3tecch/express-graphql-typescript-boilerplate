import { Exception } from '../../../src/exceptions';


describe('Exception', () => {
    describe('hasName', () => {
        it('should return true if the given error has an error code in his message', () => {
            expect(Exception.hasName('AbZ:')).toBeTruthy();
            expect(Exception.hasName(new Error('AbZ:a_z:'))).toBeTruthy();
        });
        it('should return false if the given error has no error code in his message', () => {
            expect(Exception.hasName('Test')).toBeFalsy();
            expect(Exception.hasName(new Error('Test'))).toBeFalsy();
        });
    });
        describe('getName', () => {
        it('should return the error code of the given message', () => {
            expect(Exception.getName('AbZ:')).toBe('AbZ');
        });
        it('should return 000 for an unknown error', () => {
            expect(Exception.getName('Test')).toBe('UnkownException');
        });
    });
    describe('getMessage', () => {
        it('should return the message without the error code', () => {
            expect(Exception.getMessage('AbZ:message')).toBe('message');
            expect(Exception.getMessage('message')).toBe('message');
        });
    });
});
