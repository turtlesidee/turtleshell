import { Collection } from 'mongodb';
import { Event } from '../event/types';
import * as TE from 'fp-ts/TaskEither';
import { BadRequest, Failed, InternalServerError } from '../output';
import { pipe } from 'fp-ts/lib/function';

export const is_event_already_processed =
    <T>(collection: Collection) =>
    (event: Event<T>): TE.TaskEither<Failed<unknown>, Event<T>> => {
        return pipe(
            TE.tryCatch(
                () => collection.findOne<Event<T>>({ 'metadata.id': event.metadata.id }),
                () => InternalServerError(),
            ),
            TE.chain((eventFound) => {
                if (!eventFound) {
                    return pipe(
                        TE.tryCatch(
                            () => collection.insertOne(event),
                            () => InternalServerError(),
                        ),
                        TE.map(() => event),
                    );
                }
                return TE.left(BadRequest('Message already processed'));
            }),
        );
    };
