import { configuration } from './../../src/environments/production';

describe('Environments:Development', () => {
    it('Should hava a host and port', () => {
        expect(configuration.host).not.toBe('localhost');
        expect(configuration.port).toBeGreaterThan(0);
    });
    it('Should hava a database connection', () => {
        expect(configuration.database).toBeDefined();
    });
    it('Should hava a empty debug scope', () => {
        expect(configuration.debug.length).toBe(0);
    });
    it('Should hava a logger console', () => {
        expect(configuration.logger.console.level).toBe('debug');
    });
});
