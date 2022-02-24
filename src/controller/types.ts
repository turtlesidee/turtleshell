import { Request } from 'express';
import { Command } from '../command/types';
import { Failed, Succeeded } from '../output';
import * as TE from 'fp-ts/TaskEither';
import * as E from 'fp-ts/Either';
import { Query } from '../query/types';

export type ValidatorRequestFn<N extends { jwt_secret: string }, R> = (
    request: Request,
    env: N,
) => E.Either<Failed<unknown>, R>;

export type ValidatorRequestFnTE<N extends { jwt_secret: string }, R> = (
    request: Request,
    env: N,
) => TE.TaskEither<Failed<unknown>, R>;

export type FromRequestToCommandFn<N, R, T, K, X> = (request: R, env: N) => Command<T, K, X>;

export type CommandHandlerFn<N, T, K, X, V, W> = (
    env: N,
    command: Command<T, K, X>,
    id_key?: string,
) => TE.TaskEither<Failed<unknown>, Succeeded<V, W>>;

export type FromRequestToQueryFn<R, N, T, K> = (request: R, env: N) => Query<T, K>;

export type QueryHandlerFn<N, T, K, X, W> = (
    env: N,
    query: Query<T, K>,
) => TE.TaskEither<Failed<unknown>, Succeeded<X, W>>;
