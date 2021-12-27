/* istanbul ignore file */
import * as t from 'io-ts';

interface BusinessNameBrand {
    readonly BusinessName: unique symbol;
}

export type BusinessName = t.Branded<string, BusinessNameBrand>;
export const BusinessNameCodec = t.brand(t.string, (s): s is BusinessName => s.length > 0, 'BusinessName');
