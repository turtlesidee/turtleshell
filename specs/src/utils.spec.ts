import { is_object, make_random_string, repeat, shuffle } from '../../src/utils';

describe('is_object function', () => {
    test('should return true when empty object is provided', () => {
        expect(is_object({})).toBe(true);
    });

    test('should return true when object is provided', () => {
        expect(is_object({ property: 'value' })).toBe(true);
    });

    test('should return false when non-object is provided', () => {
        expect(is_object('string')).toBe(false);
        expect(is_object(3)).toBe(false);
        expect(is_object([])).toBe(false);
        expect(is_object(null)).toBe(false);
        expect(is_object(undefined)).toBe(false);
    });
});

describe('shuffle funciton', () => {
    test('should return array shuffled', () => {
        const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const arr_shuffle = shuffle(arr);
        const sum = (a: number, b: number) => a + b;

        expect(arr_shuffle).not.toStrictEqual(arr);
        expect(arr_shuffle.reduce(sum, 0)).toEqual(arr.reduce(sum, 0));
    });
});

describe('repeat function', () => {
    test('should return function executed 4 times', () => {
        const fn = () => 1;
        expect(repeat(fn, 4)).toStrictEqual([1, 1, 1, 1]);
    });

    test('should return empty array when function return void', () => {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        const fn = () => {};
        expect(repeat(fn, 2)).toStrictEqual([]);
    });
});

describe('make_random_string function', () => {
    test('should return string of length 5 when 5 is provided', () => {
        expect(make_random_string(5).length).toBe(5);
    });
});
