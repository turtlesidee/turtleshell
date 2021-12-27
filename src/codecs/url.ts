/* istanbul ignore file */
import { string, Branded, brand } from 'io-ts';

export interface URLBrand {
    readonly URL: unique symbol;
}

const url_regex =
    /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

export type URL = Branded<string, URLBrand>;
export const URLCodec = brand(string, (s): s is URL => url_regex.test(s), 'URL');
