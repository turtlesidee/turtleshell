import { TaskEither } from 'fp-ts/lib/TaskEither';
import { Failed } from '../output/types';
import {
    Aggregate,
    RetrieveAggregateFunction,
    SaveAggregateFunction,
    TransformAggregateFunction,
    DispatchAggregateEventFunction,
} from './types';
import { Event } from '../event/types';

/* istanbul ignore next */
export const retrieve =
    <T, K>(fn: RetrieveAggregateFunction<T, K>) =>
    (id_key: string): TaskEither<Failed<unknown>, Aggregate<T, K>> =>
        fn(id_key);

/* istanbul ignore next */
export const persist =
    <T, K>(fn: SaveAggregateFunction<T, K>) =>
    (entity: Aggregate<T, K>): TaskEither<Failed<unknown>, Event<T>[]> =>
        fn(entity);

/* istanbul ignore next */
export const dispatch =
    <T>(fn: DispatchAggregateEventFunction<T>) =>
    (events: Event<T>[]): string =>
        fn(events);

/**
 * Get new events processed
 */
export const get_new_events = <T, K>(aggregate: Aggregate<T, K>): T[] =>
    aggregate.events.filter((event) => !aggregate.retrieved_events.includes(event));

/**
 * Recreate aggregate from an initial state and set of events
 */
export const hydrate = <T, K>(
    fn: TransformAggregateFunction<T, K>,
    events: T[],
    initial_state: Aggregate<T, K>,
): Aggregate<T, K> => {
    return {
        ...events.reduce((x, y) => fn(x, y), initial_state),
        retrieved_events: events,
    };
};
