import { Types } from 'ably';
import { Command } from '../command/types';
import { Event } from '../event/types';
import Message = Types.Message;
import * as TE from 'fp-ts/TaskEither';
import { Failed } from '../output';
export type MessageCallback = (msg: Message) => void;

export interface EventHandler {
    handle: MessageCallback;
    event: string | string[];
    name: string;
}

export type FromEventToCommand<T, K, X> = (event: Event<any>) => Command<T, K, X>;

export type FromEventToData<T> = (event: Event<any>) => T;

export type DbFn<T> = (data: T) => TE.TaskEither<Failed<unknown>, any>;
