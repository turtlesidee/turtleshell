import { Collection } from 'mongodb';
import * as TE from 'fp-ts/TaskEither';
import { get_new_events, hydrate } from '../aggregate/aggregate';
import { pipe } from 'fp-ts/lib/function';
import { Aggregate, TransformAggregateFunction } from '../aggregate/types';
import { Failed, InternalServerError } from '../output';

export const get =
    (collection: Collection) =>
    <T, K>(aggregate_function: TransformAggregateFunction<T, K>, initial_state: Aggregate<T, K>) =>
    (id: string): TE.TaskEither<Failed<unknown>, Aggregate<T, K>> => {
        return pipe(
            TE.tryCatch(
                () => collection.find<T>({ 'data.id': id }).toArray(),
                () => InternalServerError(),
            ),
            TE.map((events) => {
                return hydrate(aggregate_function, events, initial_state);
            }),
        );
    };

export const save =
    (collection: Collection) =>
    <T, K>(aggregate: Aggregate<T, K>): TE.TaskEither<Failed<unknown>, T[]> => {
        return pipe(
            TE.bindTo('new_events')(TE.of(get_new_events(aggregate))),
            TE.bind('documents_saved', ({ new_events }) =>
                TE.tryCatch(
                    () => collection.insertMany(new_events),
                    () => InternalServerError(),
                ),
            ),
            TE.map(({ new_events }) => new_events),
        );
    };
