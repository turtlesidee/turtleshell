import * as E from 'fp-ts/Either';
import * as TE from 'fp-ts/TaskEither';
import { Request, Response } from 'express';
import { pipe } from 'fp-ts/lib/function';
import { CommandHandlerFn, FromRequestToCommandFn, ValidatorRequestFn } from './types';
import { respond } from '../response/response';

export const controller_with_auth =
    <N extends { jwt_secret: string }, R, T, K, X, V, W>(
        request_validator: ValidatorRequestFn<N, R>,
        from_request_to_command: FromRequestToCommandFn<N, R, T, K, X>,
        command_handler: CommandHandlerFn<N, T, K, X, V, W>,
        id_key = 'id',
    ) =>
    (env: N) =>
    (req: Request, res: Response) =>
        pipe(
            E.bindTo('request')(request_validator(req, env)),
            E.bind('command', ({ request }) => E.of(from_request_to_command(request, env))),
            TE.fromEither,
            TE.bind('response', ({ command }) => command_handler(env, command, id_key)),
            respond(res),
        )();
