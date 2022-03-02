import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JwtTokenDecoded } from '..';

const extract_who_from_headers = (req: Request) => {
    if (req.headers.authorization) {
        const authorization_bearer = req.headers.authorization;
        const token = authorization_bearer.split(' ')[1];

        if (token) {
            const decoded = jwt.decode(token) as JwtTokenDecoded;
            if (decoded.who) {
                return decoded.who;
            }
        }
    }

    return 'NO AUTH';
};

export const log_api_call = (res: Response, data: unknown, internal?: unknown) => {
    const req = res.req;
    const url = req.originalUrl;
    const method = req.method;
    const status_code = res.statusCode;
    const who = extract_who_from_headers(req);

    console.log(`${method} - ${url} ~ ${status_code} :: ${who} 
        ${JSON.stringify(data)}
        ${JSON.stringify(internal)}`);
};
