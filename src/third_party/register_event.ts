import { Collection } from 'mongodb';
import { Event } from '../event/types';
import * as TE from 'fp-ts/TaskEither';
import { Failed, InternalServerError } from '../output';
import { pipe } from 'fp-ts/lib/function';

export const register_event =
    <T>(collection: Collection) =>
    (event: Event<T>): TE.TaskEither<Failed<unknown>, unknown> => {
        return pipe(
            TE.tryCatch(
                () => collection.insertOne(event),
                () => InternalServerError(),
            ),
        );
    };
