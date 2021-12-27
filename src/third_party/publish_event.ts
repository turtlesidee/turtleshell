import { Types } from 'ably';
import RealtimeChannelCallbacks = Types.RealtimeChannelCallbacks;
import { v4 as uuid } from 'uuid';
import { Event } from '../event/types';
import * as TE from 'fp-ts/TaskEither';
import { event_backup } from '../event_backup/event_backup';
import { URL } from '../codecs';

const publishEventP = <T>(ch: RealtimeChannelCallbacks, clientId: string, event: Event<T>): Promise<string> =>
    new Promise((resolve, reject) => {
        const mess = {
            id: uuid(),
            name: event.metadata.type.name,
            clientId,
            data: event,
        };

        ch.publish(mess, (err) => (err === null ? resolve('ok') : reject('no ok')));
    });

const publish_event = <E extends { integrity_service_url: URL }, T>(
    ch: RealtimeChannelCallbacks,
    clientId: string,
    event: Event<T>,
    env: E,
): TE.TaskEither<string, string> => {
    return TE.tryCatch(
        () => publishEventP(ch, clientId, event),
        () => {
            event_backup(env.integrity_service_url, event);
            return 'nok';
        },
    );
};

export const publish =
    <E extends { integrity_service_url: URL }, T>(ch: RealtimeChannelCallbacks, clientId: string, env: E) =>
    (events: Event<T>[]): string => {
        events.map((event) => publish_event(ch, clientId, event, env)());
        return '';
    };
