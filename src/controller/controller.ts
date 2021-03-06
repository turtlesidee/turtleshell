import * as E from 'fp-ts/Either';
import * as TE from 'fp-ts/TaskEither';
import { NextFunction, Request, Response } from 'express';
import { pipe } from 'fp-ts/lib/function';
import { CommandHandlerFn, FromRequestToCommandFn, ValidatorRequestFn } from './types';
import { respond } from '../response/response';
import { FromRequestToQueryFn, QueryHandlerFn, ValidatorRequestFnTE } from '.';

export const controller_with_auth =
    <N extends { jwt_secret: string }, R, T, K, X, V>(
        request_validator: ValidatorRequestFn<N, R>,
        from_request_to_command: FromRequestToCommandFn<N, R, T, K, X>,
        command_handler: CommandHandlerFn<N, T, K, X, V>,
        id_key = 'id',
    ) =>
    (env: N) =>
    (req: Request, res: Response, next: NextFunction) =>
        pipe(
            E.bindTo('request')(request_validator(req, env)),
            E.bind('command', ({ request }) => E.of(from_request_to_command(request, env))),
            TE.fromEither,
            TE.bind('response', ({ command }) => command_handler(env, command, id_key)),
            respond(res, next),
        )();

export const controller_with_auth_TE =
    <N extends { jwt_secret: string }, R, T, K, X, V>(
        request_validator: ValidatorRequestFnTE<N, R>,
        from_request_to_command: FromRequestToCommandFn<N, R, T, K, X>,
        command_handler: CommandHandlerFn<N, T, K, X, V>,
        id_key = 'id',
    ) =>
    (env: N) =>
    (req: Request, res: Response, next: NextFunction) =>
        pipe(
            TE.bindTo('request')(request_validator(req, env)),
            TE.bind('command', ({ request }) => TE.of(from_request_to_command(request, env))),
            TE.bind('response', ({ command }) => command_handler(env, command, id_key)),
            respond(res, next),
        )();

export const controller_projector =
    <N extends { jwt_secret: string }, R, T, K, X>(
        request_validator: ValidatorRequestFn<N, R>,
        from_request_to_query: FromRequestToQueryFn<R, N, T, K>,
        query_handler: QueryHandlerFn<N, T, K, X>,
    ) =>
    (env: N) =>
    (req: Request, res: Response, next: NextFunction) =>
        pipe(
            E.bindTo('request')(request_validator(req, env)),
            E.bind('query', ({ request }) => E.of(from_request_to_query(request, env))),
            TE.fromEither,
            TE.bind('response', ({ query }) => query_handler(env, query)),
            respond(res, next),
        )();
