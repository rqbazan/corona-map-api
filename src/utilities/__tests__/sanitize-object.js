import { sanitizeObject } from '../sanitize-object';
describe('sanitize object', () => {
    it('should omit nil values', () => {
        const result = sanitizeObject({ a: null, b: undefined, c: 1 });
        expect(result.a).toBeUndefined();
        expect(result.b).toBeUndefined();
        expect(result.c).toBeDefined();
    });
});
