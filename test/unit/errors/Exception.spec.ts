import { Exception } from '../../../src/exceptions';


describe('Exception', () => {
    describe('hasKey', () => {
        it('should return true if the given error has an error code in his message', () => {
            expect(Exception.hasKey('AbZ:a_z:')).toBeTruthy();
            expect(Exception.hasKey(new Error('AbZ:a_z:'))).toBeTruthy();
        });
        it('should return false if the given error has no error code in his message', () => {
            expect(Exception.hasKey('Test')).toBeFalsy();
            expect(Exception.hasKey(new Error('Test'))).toBeFalsy();
        });
    });
    describe('getKey', () => {
        it('should return the error code of the given message', () => {
            expect(Exception.getKey('AbZ:a_z:')).toBe('a_z');
        });
        it('should return 000 for an unknown error', () => {
            expect(Exception.getKey('Test')).toBe('e_unkown');
        });
    });
        describe('getName', () => {
        it('should return the error code of the given message', () => {
            expect(Exception.getName('AbZ:a_z:')).toBe('AbZ');
        });
        it('should return 000 for an unknown error', () => {
            expect(Exception.getName('Test')).toBe('UnkownException');
        });
    });
    describe('getMessage', () => {
        it('should return the message without the error code', () => {
            expect(Exception.getMessage('AbZ:a_z:message')).toBe('message');
            expect(Exception.getMessage('message')).toBe('message');
        });
    });
});
