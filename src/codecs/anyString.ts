/* istanbul ignore file */
import * as t from 'io-ts';

export interface AnyStringBrand {
    readonly AnyString: unique symbol;
}

export type AnyString = t.Branded<string, AnyStringBrand>;
export const AnyStringCodec = t.brand(t.string, (s): s is AnyString => s.length > 0, 'AnyString');
