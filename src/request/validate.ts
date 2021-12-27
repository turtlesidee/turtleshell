import { Request } from 'express';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/lib/function';
import * as t from 'io-ts';
import { BadRequest } from '../output/failed';
import { Failed } from '../output/types';
import { Codec } from './types';

export const validate =
    <T>(codec: Codec<T>) =>
    (req: Request): E.Either<Failed<string[]>, T> => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const parameters = { ...req.body, ...req.headers, ...req.params, ...req.query, files: req.files };
        return pipe(
            codec.decode(parameters),
            E.map((a) => a),
            E.mapLeft(extract_message),
        );
    };

const extract_context = (data: t.Context) => {
    const context = data.filter((d) => d.key !== '');
    const path = context.map((c) => c.key).join('.');

    const error = context[context.length - 1].actual;
    const expected = context[context.length - 1].type.name;

    return `there is an error on ${path} received ${error}, expected ${expected}`;
};

const extract_message = (errors: t.Errors): Failed<string[]> => {
    const result = errors.map((e) => extract_context(e.context));
    return BadRequest(result);
};
