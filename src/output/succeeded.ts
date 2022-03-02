import { is_object } from '../utils';
import { Succeeded } from './types';

export const is_succeeded = <K>(d: unknown): d is Succeeded<K> =>
    is_object(d) && 'message' in d && 'http_code' in d && 'status' in d && d.status === 'success';

export const ActionPerformed = (message: string): Succeeded<null> => ({
    status: 'success',
    message,
    http_code: 200,
});

export const ResourceCreated = (message: string): Succeeded<null> => ({
    status: 'success',
    message,
    http_code: 201,
});

export const Payload = <K>(message: string, payload: K): Succeeded<K> => ({
    status: 'success',
    message,
    payload,
    http_code: 200,
});
