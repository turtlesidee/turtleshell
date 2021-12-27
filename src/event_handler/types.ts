import { Types } from 'ably';
import { Command } from '../command/types';
import { Event } from '../event/types';
import Message = Types.Message;
export type MessageCallback = (msg: Message) => void;

export interface EventHandler {
    handle: MessageCallback;
    event: string | string[];
    name: string;
}

export type FromEventToCommand = <E, T, K, X>(event: Event<E>) => Command<T, K, X>;
