import { Request } from 'express';
import { pipe } from 'fp-ts/lib/function';
import * as E from 'fp-ts/Either';
import { check_token } from '../token/token';
import { Codec, FormatAuthorizationFn, FormatFn } from './types';
import { validate } from './validate';
import { AuthorizationBearer, JwtTokenDecoded } from '../codecs';
import { Failed } from '../output';

export const request_with_auth =
    <V extends { authorization: AuthorizationBearer }, N extends { jwt_secret: string }, R>(
        { claims, audiences }: { claims: string[]; audiences: string[] },
        codec: Codec<V>,
        format_fn: FormatAuthorizationFn<V, R>,
    ) =>
    (req: Request, env: N): E.Either<Failed<unknown>, R> =>
        pipe(
            E.bindTo('request')(validate(codec)(req)),
            E.bind('jwt_token_decoded', ({ request }) =>
                check_token({ audiences, claims, jwt_secret: env.jwt_secret })(request.authorization),
            ),
            E.map<{ request: V; jwt_token_decoded: JwtTokenDecoded }, R>(format_fn),
        );

export const request_without_auth =
    <V, R>(codec: Codec<V>, format_fn: FormatFn<V, R>) =>
    (req: Request): E.Either<Failed<unknown>, R> =>
        pipe(E.bindTo('request')(validate(codec)(req)), E.map<{ request: V }, R>(format_fn));
