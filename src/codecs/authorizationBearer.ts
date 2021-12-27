/* istanbul ignore file */
import * as t from 'io-ts';

export interface AuthorizationBearerBrand {
    readonly AuthorizationBearer: unique symbol;
}

const authorization_regex = /^(b|B)(earer) [a-zA-Z0-9._-]+$/i;

export type AuthorizationBearer = t.Branded<string, AuthorizationBearerBrand>;
export const AuthorizationBearerCodec = t.brand(
    t.string,
    (s): s is AuthorizationBearer => authorization_regex.test(s) && s.split('.').length === 3,
    'AuthorizationBearer',
);
