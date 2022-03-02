import { ProcessFn, ResponseFn, ProcessFnTE } from './types';
import * as TE from 'fp-ts/TaskEither';
import { Failed, Succeeded } from '../output';
import { Query } from '../query/types';
import { pipe } from 'fp-ts/lib/function';

export const query_handler =
    <Y, A, T, K, X>(process_fn: ProcessFn<T, K, Y>, response_fn: ResponseFn<K, X>) =>
    (env: Y, query: Query<A, T>): TE.TaskEither<Failed<unknown>, Succeeded<X>> =>
        pipe(
            TE.bindTo('data')(query.execute(query.data)),
            TE.bind('process_data', ({ data }) => TE.of(process_fn(data, env))),
            TE.map(({ process_data }) => response_fn(process_data)),
        );

export const query_handler_TE =
    <Y, A, T, K, X>(process_fn: ProcessFnTE<T, K, Y>, response_fn: ResponseFn<K, X>) =>
    (env: Y, query: Query<A, T>): TE.TaskEither<Failed<unknown>, Succeeded<X>> =>
        pipe(
            TE.bindTo('data')(query.execute(query.data)),
            TE.bind('process_data', ({ data }) => process_fn(data, env)),
            TE.map(({ process_data }) => response_fn(process_data)),
        );
