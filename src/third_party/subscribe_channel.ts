import { Types } from 'ably';
import { EventHandler } from '../event_handler/types';
import RealtimeChannelCallbacks = Types.RealtimeChannelCallbacks;

export const subscribe = (ch: RealtimeChannelCallbacks, handler: EventHandler): Promise<string> =>
    new Promise((resolve, reject) => {
        ch.subscribe(handler.event, handler.handle, (err) => {
            return err === undefined ? resolve(handler.name) : reject(handler.name);
        });
    });
