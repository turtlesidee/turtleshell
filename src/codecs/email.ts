/* istanbul ignore file */
import { string, Branded, brand } from 'io-ts';

export interface EmailBrand {
    readonly email: unique symbol;
}

const email_regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export type Email = Branded<string, EmailBrand>;
export const EmailCodec = brand(string, (s): s is Email => email_regex.test(s), 'email');
