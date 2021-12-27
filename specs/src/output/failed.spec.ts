import { InternalServerError, BadRequest, ForbiddenAccess, Unauthorized, is_failed } from '../../../src/output/failed';

describe('is_failed function', () => {
    test('should return true when Failed object provided', () => {
        expect(is_failed(InternalServerError())).toBeTruthy();
        expect(is_failed(BadRequest(['There is an error on']))).toBeTruthy();
        expect(is_failed(ForbiddenAccess(['Nice try']))).toBeTruthy();
        expect(is_failed(Unauthorized(['Nice try']))).toBeTruthy();
    });
    test('should return false when non Failed object provided', () => {
        expect(is_failed({})).toBeFalsy();
        expect(is_failed(1)).toBeFalsy();
        expect(is_failed('test')).toBeFalsy();
        expect(is_failed([])).toBeFalsy();
    });
});
