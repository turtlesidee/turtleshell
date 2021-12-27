import { Request } from 'express';
import * as t from 'io-ts';
import { AnyStringCodec, BusinessNameCodec, EmailCodec } from '../../../src/codecs';
import { validate } from '../../../src/request/validate';
import * as E from 'fp-ts/Either';
const request_correct = {
    body: {
        name: 'sawsen',
        email: 'sawsen@shareid.ai',
        business_name: 'shareid',
    },
} as Request;

const request_incorrect = {
    body: {
        name: 3,
        email: 'test',
    },
} as Request;

const codec_request = t.type({
    name: AnyStringCodec,
    email: EmailCodec,
    business_name: BusinessNameCodec,
});

describe('validate_request function', () => {
    test('should return request body when request is correct', () => {
        const result = E.fold(
            (a) => a,
            (a) => a,
        )(validate(codec_request)(request_correct));
        const expected_result = { name: 'sawsen', email: 'sawsen@shareid.ai', business_name: 'shareid' };
        expect(result).toEqual(expected_result);
    });

    test('should return errors when request is incorrect', () => {
        const result = E.fold(
            (a) => a,
            (a) => a,
        )(validate(codec_request)(request_incorrect));

        const expected_result = {
            status: 'failed',
            message: 'Bad request',
            http_code: 400,
            description: [
                'there is an error on name received 3, expected AnyString',
                'there is an error on email received test, expected email',
                'there is an error on business_name received undefined, expected BusinessName',
            ],
        };
        expect(result).toEqual(expected_result);
    });
});
