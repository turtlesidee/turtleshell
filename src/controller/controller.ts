import * as E from 'fp-ts/Either';
import * as TE from 'fp-ts/TaskEither';
import { Request, Response } from 'express';
import { pipe } from 'fp-ts/lib/function';
import { CommandHandlerFn, FromRequestToCommandFn, ValidatorRequestFn } from './types';
import { respond } from '../response/response';

export const controller =
    <N>(env: N) =>
    (
        request_validator: ValidatorRequestFn,
        from_request_to_command: FromRequestToCommandFn,
        command_handler: CommandHandlerFn,
        id_key: 'id',
    ) =>
    (req: Request, res: Response) =>
        pipe(
            E.bindTo('request')(request_validator(req, env)),
            E.bind('command', ({ request }) => E.of(from_request_to_command(request))),
            TE.fromEither,
            TE.bind('response', ({ command }) => command_handler(command, id_key)),
            respond(res),
        );
