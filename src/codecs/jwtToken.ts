/* istanbul ignore file */
import * as t from 'io-ts';

interface JwtTokenBrand {
    readonly JwtToken: unique symbol;
}
export type JwtToken = t.Branded<string, JwtTokenBrand>;
export const JwtTokenCodec = t.brand(t.string, (s): s is JwtToken => s.split('.').length === 3, 'JwtToken');
