/**
 * Predicate to test variable
 */
export const is_object = (d: unknown): d is Record<string, unknown> =>
    typeof d === 'object' && d !== null && !Array.isArray(d);

/**
 * Shuffle an array
 */
export const shuffle = <T>(array: T[]): T[] => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
};

/**
 * Repeat a function
 **/
export const repeat = <T>(fn: () => T, number: number): T[] => {
    const arr = [...Array(number)];

    return arr.map(() => fn()).filter((i) => i !== undefined);
};

/**
 * Create random string follow allowed chars
 */
export const make_random_string = (length: number): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    return repeat(() => characters.charAt(Math.floor(Math.random() * characters.length)), length).join('');
};
