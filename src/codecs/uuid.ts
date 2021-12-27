/* istanbul ignore file */
import { string, Branded, brand } from 'io-ts';

export interface UUIDBrand {
    readonly UUID: unique symbol;
}

const uuid_regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export type UUID = Branded<string, UUIDBrand>;
export const UUIDCodec = brand(string, (s): s is UUID => uuid_regex.test(s), 'UUID');
