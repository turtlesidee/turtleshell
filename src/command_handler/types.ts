import { Aggregate } from '../aggregate/types';
import { Command } from '../command/types';
import * as E from 'fp-ts/Either';
import { Failed, Succeeded } from '../output';
import { Event } from '../event/types';

export type AggregateFunction = <T, K, X>(
    command: Command<T, K, X>,
) => <N>(aggregate: Aggregate<T, K>, env?: N) => E.Either<Failed<unknown>, Aggregate<T, K>>;

export type ResponseFunction<T, V, W> = ({ new_events }: { new_events: Event<T>[] }) => Succeeded<V, W>;
