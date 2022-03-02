import { is_object } from '../utils';
import { Failed } from './types';

export const is_failed = <T>(d: unknown): d is Failed<T> =>
    is_object(d) && 'message' in d && 'description' in d && 'http_code' in d && 'status' in d && d.status === 'failed';

export const InternalServerError = <T>(
    internal?: string,
    description = 'We currently experience issue',
): Failed<T | string> => ({
    status: 'failed',
    message: 'Internal server error',
    http_code: 500,
    internal,
    description,
});

export const BadRequest = <T>(description: T, internal?: string): Failed<T> => ({
    status: 'failed',
    message: 'Bad request',
    http_code: 400,
    description,
    internal,
});

export const ForbiddenAccess = <T>(description: T, internal?: string): Failed<T> => ({
    status: 'failed',
    message: 'Forbidden access',
    http_code: 403,
    description,
    internal,
});

export const Unauthorized = <T>(description: T, internal?: string): Failed<T> => ({
    status: 'failed',
    message: 'Unauthorized',
    http_code: 401,
    description,
    internal,
});
