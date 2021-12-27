import { TaskEither } from 'fp-ts/TaskEither';
import { Failed } from '../output/types';
import { Event } from '../event/types';

export interface Aggregate<T, K> {
    events: T[];
    retrieved_events: T[];
    state: K;
}

export type RetrieveAggregateFunction<T, K> = (idKey: string) => TaskEither<Failed<unknown>, Aggregate<T, K>>;

export type SaveAggregateFunction<T, K> = (aggregate: Aggregate<T, K>) => TaskEither<Failed<unknown>, Event<T>[]>;

export type DispatchAggregateEventFunction<T> = (events: Event<T>[]) => string;

export type TransformAggregateFunction<T, K> = (aggregate: Aggregate<T, K>, event: T) => Aggregate<T, K>;
