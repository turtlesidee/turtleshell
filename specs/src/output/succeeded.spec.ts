import { ActionPerformed, is_succeeded, Payload, ResourceCreated } from '../../../src/output/succeeded';

describe('is_succeeded function', () => {
    test('should return true when Succeeded object provided', () => {
        expect(is_succeeded(ActionPerformed('action'))).toBeTruthy();
        expect(is_succeeded(Payload('action', {}))).toBeTruthy();
        expect(is_succeeded(ResourceCreated('resource'))).toBeTruthy();
    });
    test('should return false when non Succeeded object provided', () => {
        expect(is_succeeded({})).toBeFalsy();
        expect(is_succeeded(1)).toBeFalsy();
        expect(is_succeeded('test')).toBeFalsy();
        expect(is_succeeded([])).toBeFalsy();
    });
});
