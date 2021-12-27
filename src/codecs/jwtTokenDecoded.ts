/* istanbul ignore file */
import { AudienceCodec, URLCodec, UUIDCodec, ClaimCodec } from '.';
import * as t from 'io-ts';

export const JwtTokenDecodedCodec = t.type({
    who: t.string,
    jti: UUIDCodec,
    iss: URLCodec,
    claims: ClaimCodec,
    audiences: AudienceCodec,
});

export type JwtTokenDecoded = t.TypeOf<typeof JwtTokenDecodedCodec>;
