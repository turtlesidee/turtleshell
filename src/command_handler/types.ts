import { Aggregate } from '../aggregate/types';
import { Command } from '../command/types';
import * as E from 'fp-ts/Either';
import * as TE from 'fp-ts/TaskEither';
import { Failed, Succeeded } from '../output';
import { Event } from '../event/types';

export type AggregateFunction<T, K, X> = (
    command: Command<T, K, X>,
) => (aggregate: Aggregate<T, K>, env?: any) => E.Either<Failed<unknown>, Aggregate<T, K>>;

export type AggregateFunctionTE<T, K, X> = (
    command: Command<T, K, X>,
) => (aggregate: Aggregate<T, K>, env?: any) => TE.TaskEither<Failed<unknown>, Aggregate<T, K>>;

export type ResponseFunction<T, V, W> = ({ new_events }: { new_events: Event<T>[] }) => Succeeded<V, W>;
