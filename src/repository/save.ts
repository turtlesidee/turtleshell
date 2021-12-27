import { Collection } from 'mongodb';
import * as TE from 'fp-ts/TaskEither';
import { get_new_events } from '../aggregate/aggregate';
import { pipe } from 'fp-ts/lib/function';
import { Aggregate } from '../aggregate/types';
import { Failed, InternalServerError } from '../output';

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
