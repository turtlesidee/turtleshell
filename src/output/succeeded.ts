import { is_object } from '../utils';
import { Succeeded } from './types';

export const is_succeeded = <K, T>(d: unknown): d is Succeeded<K, T> =>
    is_object(d) && 'message' in d && 'http_code' in d && 'status' in d && d.status === 'success';

export const ActionPerformed = <K, T>(message: string): Succeeded<K, T> => ({
    status: 'success',
    message,
    http_code: 200,
});

export const ResourceCreated = <K, T>(message: string): Succeeded<K, T> => ({
    status: 'success',
    message,
    http_code: 201,
});

export const Payload = <K, T>(message: string, payload: K): Succeeded<K, T> => ({
    status: 'success',
    message,
    payload,
    http_code: 200,
});
