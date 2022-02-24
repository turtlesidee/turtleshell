import { Types } from 'ably';
import { pipe } from 'fp-ts/lib/function';
import { Event } from '../event/types';
import { is_event_already_processed } from '../third_party/is_event_already_processed';
import { EventHandler, FromEventToCommand, DbFn, FromEventToData } from './types';
import * as TE from 'fp-ts/TaskEither';
import Message = Types.Message;
import { CommandHandlerFn } from '../controller/types';
import { URL } from '../codecs';
import { event_backup } from '../event_backup/event_backup';
import { register_event } from '../third_party/register_event';

export const event_handler = <N extends { integrity_service_url: URL }, T, K, X, V, W>(
    env: N,
    collection_key: string,
    event_name: string,
    from_event_to_command: FromEventToCommand<T, K, X>,
    command_handler: CommandHandlerFn<N, T, K, X, V, W>,
    id_key?: string,
): EventHandler => {
    const handle = <T>(msg: Message) => {
        const event_received = msg.data as Event<T>;
        pipe(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            is_event_already_processed<T>(env[collection_key])(event_received),
            TE.map(from_event_to_command),
            TE.chain((command) => command_handler(env, command, id_key)),
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            TE.map(() => register_event(env[collection_key])(event_received)),
            TE.mapLeft(() => event_backup(env.integrity_service_url, event_received)),
        )();
    };
    return {
        handle,
        event: event_name,
        name: `${event_name} listener`,
    };
};

export const event_handler_projector = <N extends { integrity_service_url: URL }, T>(
    env: N,
    collection_key: string,
    event_name: string,
    from_event_to_data: FromEventToData<T>,
    operation: DbFn<T>,
): EventHandler => {
    const handle = <T>(msg: Message) => {
        const event_received = msg.data as Event<T>;

        pipe(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            is_event_already_processed<T>(env[collection_key])(event_received),
            TE.map(from_event_to_data),
            TE.chain(operation),
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            TE.map(() => register_event(env[collection_key])(event_received)),
            TE.mapLeft(() => event_backup(env.integrity_service_url, event_received)),
        )();
    };
    return {
        handle,
        event: event_name,
        name: `${event_name} listener`,
    };
};
