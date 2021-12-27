import { ONBOARDING_SERVICE, READ_ONBOARDING_REQUEST, READ_USER, USER_SERVICE } from '../../../src/codecs';
import { check_refresh_token, check_token } from '../../../src/token/token';
import { create_mock_authorization_bearer, create_mock_refresh_token } from './token.mock';
import * as E from 'fp-ts/Either';

describe('check_token function', () => {
    test('should return token decoded when all condition are met', () => {
        const configuration_token = {
            jwt_secret: 'secret',
            claims: [READ_USER],
            audiences: [ONBOARDING_SERVICE],
        };
        const authorization = create_mock_authorization_bearer();

        const result = check_token(configuration_token)(authorization);
        expect(result._tag).toBe('Right');
    });

    test('should return Forbidden Access: You do not have necessary claims', () => {
        const configuration_token = {
            jwt_secret: 'secret',
            claims: [READ_ONBOARDING_REQUEST],
            audiences: [ONBOARDING_SERVICE],
        };

        const authorization = create_mock_authorization_bearer();
        const result = E.fold(
            (a) => a,
            (a) => a,
        )(check_token(configuration_token)(authorization));

        const expected_result = {
            description: 'You do not have necessary claim',
            http_code: 403,
            message: 'Forbidden access',
            status: 'failed',
        };

        expect(result).toEqual(expected_result);
    });

    test('should return Forbidden Access: You do not have necessary audience', () => {
        const configuration_token = {
            jwt_secret: 'secret',
            claims: [],
            audiences: [USER_SERVICE],
        };

        const authorization = create_mock_authorization_bearer();
        const result = E.fold(
            (a) => a,
            (a) => a,
        )(check_token(configuration_token)(authorization));

        const expected_result = {
            description: 'You do not have necessary audience',
            http_code: 403,
            message: 'Forbidden access',
            status: 'failed',
        };

        expect(result).toEqual(expected_result);
    });

    test('should return Forbidden Access: Token provided is incorrect', () => {
        const configuration_token = {
            jwt_secret: 'bad secret',
            claims: [],
            audiences: [USER_SERVICE],
        };

        const authorization = create_mock_authorization_bearer();
        const result = E.fold(
            (a) => a,
            (a) => a,
        )(check_token(configuration_token)(authorization));

        const expected_result = {
            description: 'Token provided is incorrect',
            http_code: 403,
            message: 'Forbidden access',
            status: 'failed',
        };

        expect(result).toEqual(expected_result);
    });
});

describe('check_refresh_token function', () => {
    const refresh_token = create_mock_refresh_token();

    test('should return refresh token decoded', () => {
        const result = check_refresh_token('secret')(refresh_token);
        expect(result._tag).toBe('Right');
    });

    test('should return Forbidden Access: Token provided is incorrect', () => {
        const result = E.fold(
            (a) => a,
            (a) => a,
        )(check_refresh_token('secret_')(refresh_token));

        const expected_result = {
            description: 'Refresh token provided is incorrect',
            http_code: 403,
            message: 'Forbidden access',
            status: 'failed',
        };

        expect(result).toEqual(expected_result);
    });
});
