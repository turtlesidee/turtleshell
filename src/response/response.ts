import * as TE from 'fp-ts/lib/TaskEither';
import { Failed, Succeeded } from '../output';
import { Response } from 'express';

const on_error = (res: Response) => (e: Failed<unknown>) => {
    res.status(e.http_code).send({
        status: e.status,
        message: e.message,
        description: e.description,
    });
};

const on_success =
    (res: Response) =>
    <T extends { response: Succeeded<unknown, unknown> }>({ response }: T) => {
        res.status(response.http_code).send({
            status: response.status,
            message: response.message,
            payload: response.payload,
            description: response.description,
        });
    };

export const respond = (res: Response) => TE.bimap(on_error(res), on_success(res));
