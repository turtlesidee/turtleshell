/* istanbul ignore file */
import { EmailCodec, UUIDCodec } from '.';
import * as t from 'io-ts';

export const RefreshJwtTokenDecodedCodec = t.type({
    jti: UUIDCodec,
    email: EmailCodec,
});

export type RefreshJwtTokenDecoded = t.TypeOf<typeof RefreshJwtTokenDecodedCodec>;
