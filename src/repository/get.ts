import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/TaskEither';
import { Collection } from 'mongodb';
import { hydrate } from '../aggregate/aggregate';
import { Aggregate, TransformAggregateFunction } from '../aggregate/types';
import { Failed, InternalServerError } from '../output';

export const get =
    <T, K>(aggregate_function: TransformAggregateFunction<T, K>, initial_state: Aggregate<T, K>) =>
    (collection: Collection) =>
    (id: string, key: string): TE.TaskEither<Failed<unknown>, Aggregate<T, K>> => {
        return pipe(
            TE.tryCatch(
                () => collection.find<T>({ [`data.${key}`]: id }).toArray(),
                () => InternalServerError(),
            ),
            TE.map((events) => {
                return hydrate(aggregate_function, events, initial_state);
            }),
        );
    };
