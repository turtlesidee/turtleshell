import {
    AuthorizationBearer,
    BUSINESS_SERVICE,
    JwtToken,
    ONBOARDING_SERVICE,
    READ_USER,
    WRITE_USER,
} from '../../../src/codecs';
import jwt from 'jsonwebtoken';
import { JwtTokenTypeConfiguration } from 'aws-sdk/clients/kendra';

export const create_mock_authorization_bearer = (): AuthorizationBearer => {
    const token = jwt.sign(
        {
            who: 'test',
            jti: '9cd33345-5206-4108-a659-cfdedc8de397',
            iss: 'https://google.com',
            claims: `${READ_USER} ${WRITE_USER}`,
            audiences: `${ONBOARDING_SERVICE} ${BUSINESS_SERVICE}`,
        },
        'secret',
        { expiresIn: 86400 },
    ) as JwtToken;

    return ('Bearer ' + token) as AuthorizationBearer;
};

export const create_mock_refresh_token = (): JwtToken => {
    return jwt.sign(
        {
            jti: '9cd33345-5206-4108-a659-cfdedc8de397',
            email: 'sawsen@shareid.ai',
        },
        'secret',
        { expiresIn: 900 },
    ) as JwtToken;
};
