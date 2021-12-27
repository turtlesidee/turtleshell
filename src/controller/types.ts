import { Request } from 'express';
import { Command } from '../command/types';
import { Failed, Succeeded } from '../output';
import * as TE from 'fp-ts/TaskEither';
import * as E from 'fp-ts/Either';

export type ValidatorRequestFn = <N, R>(request: Request, env?: N) => E.Either<Failed<unknown>, R>;
export type FromRequestToCommandFn = <R, T, K, X>(request: R) => Command<T, K, X>;

export type CommandHandlerFn = <T, K, X, V, W>(
    command: Command<T, K, X>,
    id_key?: string,
) => TE.TaskEither<Failed<unknown>, Succeeded<V, W>>;
