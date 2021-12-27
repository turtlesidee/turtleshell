import { MetadataCommand } from '../command/types';
import { Event, EventType, MetadataEvent } from './types';
import { v4 as uuid } from 'uuid';
import { is_object } from '../utils';

export const create_metadata_event = (command_metadata: MetadataCommand, type: EventType): MetadataEvent => ({
    who: command_metadata.who,
    when: new Date().getTime(),
    id: uuid(),
    type,
});

export const is_event =
    <T>(name: string) =>
    (d: unknown): d is Event<T> => {
        if (is_object(d) && is_object(d.metadata) && is_object(d.metadata.type)) {
            return d?.metadata?.type?.name === name;
        }

        return false;
    };
