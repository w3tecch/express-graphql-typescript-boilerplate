import { configuration } from './../../src/environments/development';

describe('Environments:Development', () => {
    it('Should hava a host and port', () => {
        expect(configuration.host).toBe('localhost');
        expect(configuration.port).toBeGreaterThan(0);
    });
    it('Should hava a database connection', () => {
        expect(configuration.database).toBeDefined();
    });
    it('Should hava a debug scope', () => {
        expect(configuration.debug.length).toBeDefined();
    });
    it('Should hava a logger console', () => {
        expect(configuration.logger.console.level).toBe('error');
    });
});
