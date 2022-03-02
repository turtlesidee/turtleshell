import * as TE from 'fp-ts/lib/TaskEither';
import { Failed, Succeeded } from '../output';
import { NextFunction, Response } from 'express';
import { log_api_call } from '../logger/log_formatter';

const on_error = (res: Response, next: NextFunction) => (e: Failed<unknown>) => {
    res.status(e.http_code).send({
        status: e.status,
        message: e.message,
        description: e.description,
    });
    log_api_call(res, e.description, e.internal);
    next();
};

const on_success =
    (res: Response, next: NextFunction) =>
    <T extends { response: Succeeded<unknown> }>({ response }: T) => {
        res.status(response.http_code).send({
            status: response.status,
            message: response.message,
            payload: response.payload,
        });
        log_api_call(res, response.payload);
        next();
    };

export const respond = (res: Response, next: NextFunction) => TE.bimap(on_error(res, next), on_success(res, next));
