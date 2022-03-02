import { Command } from '../command/types';
import * as TE from 'fp-ts/TaskEither';
import { Failed, Succeeded } from '../output';
import { pipe } from 'fp-ts/lib/function';
import { dispatch, persist, retrieve } from '../aggregate/aggregate';
import { AggregateFunction, ResponseFunction } from './types';
import { AggregateFunctionTE } from '.';

export const command_handler =
    <V, Y, T, K, X>(aggregate_fn: AggregateFunction<T, K, X>, response_fn: ResponseFunction<T, V>) =>
    (env: Y, command: Command<T, K, X>, id_key = 'id'): TE.TaskEither<Failed<unknown>, Succeeded<V>> =>
        pipe(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            TE.bindTo('aggregate')(retrieve(command.context.retrieveFn)(command.data[id_key], id_key)),
            TE.bind('aggregate_updated', ({ aggregate }) => TE.fromEither(aggregate_fn(command)(aggregate, env))),
            TE.bind('new_events', ({ aggregate_updated }) => persist(command.context.saveFn)(aggregate_updated)),
            TE.bind('_', ({ new_events }) => TE.of(dispatch(command.context.dispatchFn)(new_events))),
            TE.map(response_fn),
        );

export const command_handler_TE =
    <V, Y, T, K, X>(aggregate_fn: AggregateFunctionTE<T, K, X>, response_fn: ResponseFunction<T, V>) =>
    (env: Y, command: Command<T, K, X>, id_key = 'id'): TE.TaskEither<Failed<unknown>, Succeeded<V>> =>
        pipe(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            TE.bindTo('aggregate')(retrieve(command.context.retrieveFn)(command.data[id_key], id_key)),
            TE.bind('aggregate_updated', ({ aggregate }) => aggregate_fn(command)(aggregate, env)),
            TE.bind('new_events', ({ aggregate_updated }) => persist(command.context.saveFn)(aggregate_updated)),
            TE.bind('_', ({ new_events }) => TE.of(dispatch(command.context.dispatchFn)(new_events))),
            TE.map(response_fn),
        );
