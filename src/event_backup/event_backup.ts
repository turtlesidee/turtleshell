import { URL } from '../codecs';
import { Event } from '../event/types';
import * as TE from 'fp-ts/TaskEither';
import axios from 'axios';

export const event_backup = <T>(integrity_service_url: URL, event: Event<T>): void => {
    TE.tryCatch(
        () => axios.request({ url: integrity_service_url }),
        () => write_into_file(event),
    );
};

const write_into_file = <T>(event: Event<T>) => {
    return '';
};
