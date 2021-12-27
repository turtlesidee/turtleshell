import * as E from 'fp-ts/Either';
import {
    JwtTokenDecoded,
    AuthorizationBearer,
    JwtToken,
    Claim,
    Audience,
    RefreshJwtTokenDecodedCodec,
    RefreshJwtTokenDecoded,
    JwtTokenDecodedCodec,
} from '../codecs';
import { Failed, ForbiddenAccess, is_failed } from '../output';
import { TokenExpiredError, JwtPayload, verify } from 'jsonwebtoken';
import { is_object } from '../utils';
import { CheckTokenConfiguration } from './types';
import { pipe } from 'fp-ts/lib/function';

/**
 * Check if every needed is provided by token
 */
const check_claims =
    (claims_needed: string[]) =>
    <T extends { claims: Claim }>(token_decoded: T): E.Either<Failed<string>, T> => {
        const all_claims = token_decoded.claims.split(' ');
        if (claims_needed.every((claim) => all_claims.includes(claim))) {
            return E.right(token_decoded);
        }

        return E.left(ForbiddenAccess('You do not have necessary claim'));
    };

/**
 * Check if at least one audience needed is provided by token
 */
const check_audience =
    (audiences_allowed: string[]) =>
    <T extends { audiences: Audience }>(token_decoded: T): E.Either<Failed<string>, T> => {
        const all_audiences = token_decoded.audiences.split(' ');
        const has_one_audience = audiences_allowed.filter((a) => all_audiences.includes(a));

        if (has_one_audience.length > 0) {
            return E.right(token_decoded);
        }

        return E.left(ForbiddenAccess('You do not have necessary audience'));
    };

const is_token_expired_error = (data: unknown): data is TokenExpiredError => is_object(data) && 'expiredAt' in data;

/**
 * check if token is valid
 */
const verify_token =
    (secret: string) =>
    (authorization: AuthorizationBearer): E.Either<Failed<string>, string | JwtPayload> => {
        try {
            return E.right(verify(authorization.split(' ')[1], secret));
        } catch (reason) {
            if (is_token_expired_error(reason)) {
                return E.left(ForbiddenAccess('Token Expired'));
            }

            return E.left(ForbiddenAccess('Token provided is incorrect'));
        }
    };

/**
 * check if refresh token is valid
 */
const verify_refresh_token =
    (secret: string) =>
    (refresh_token: JwtToken): E.Either<Failed<string>, string | JwtPayload> => {
        try {
            return E.right(verify(refresh_token, secret));
        } catch (reason) {
            if (is_token_expired_error(reason)) {
                return E.left(ForbiddenAccess('Refresh Token Expired'));
            }
            return E.left(ForbiddenAccess('Refresh token provided is incorrect'));
        }
    };

/**
 * apply all check on token; (audience, claim, format)
 */
export const check_token =
    (configuration: CheckTokenConfiguration) =>
    (authorization: AuthorizationBearer): E.Either<Failed<string[] | string>, JwtTokenDecoded> => {
        return pipe(
            verify_token(configuration.jwt_secret)(authorization),
            E.chainW(JwtTokenDecodedCodec.decode),
            E.chainW(check_claims(configuration.claims)),
            E.chainW(check_audience(configuration.audiences)),
            E.mapLeft((err) => (is_failed(err) ? err : ForbiddenAccess('Token not recognized'))),
        );
    };

export const check_refresh_token =
    (secret: string) =>
    (refresh_token: JwtToken): E.Either<Failed<string[] | string>, RefreshJwtTokenDecoded> => {
        return pipe(
            verify_refresh_token(secret)(refresh_token),
            E.chainW(RefreshJwtTokenDecodedCodec.decode),
            E.mapLeft((err) => (is_failed(err) ? err : ForbiddenAccess('Token not recognized'))),
        );
    };
