import { Failed, Succeeded } from '../output';
import * as TE from 'fp-ts/lib/TaskEither';

export type ProcessFn<T, K, Y> = (data: T, env?: Y) => K;
export type ProcessFnTE<T, K, Y> = (data: T, env?: Y) => TE.TaskEither<Failed<unknown>, K>;
export type ResponseFn<K, X> = (data: K) => Succeeded<X>;
