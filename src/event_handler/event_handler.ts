import { Types } from 'ably';
import { pipe } from 'fp-ts/lib/function';
import { Event } from '../event/types';
import { is_event_already_processed } from '../third_party/is_event_already_processed';
import { EventHandler, FromEventToCommand } from './types';
import * as TE from 'fp-ts/TaskEither';
import Message = Types.Message;
import { CommandHandlerFn } from '../controller/types';
import { URL } from '../codecs';
import { event_backup } from '../event_backup/event_backup';

export const event_handler = <N extends { integrity_service_url: URL }>(
    env: N,
    collection_key: string,
    event_name: string,
    from_event_to_command: FromEventToCommand,
    command_handler: CommandHandlerFn,
    id_key?: string,
): EventHandler => {
    const handle = <T>(msg: Message) => {
        const event_received = msg.data as Event<T>;

        pipe(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            is_event_already_processed<T>(env[collection_key])(event_received),
            TE.map(from_event_to_command),
            TE.chain((command) => command_handler(command, id_key)),
            TE.mapLeft(() => event_backup(env.integrity_service_url, event_received)),
        );
    };
    return {
        handle,
        event: event_name,
        name: `${event_name} listener`,
    };
};
