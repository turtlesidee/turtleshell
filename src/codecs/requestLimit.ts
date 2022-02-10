import * as t from 'io-ts';

export interface RequestLimitBrand {
    readonly RequestLimit: unique symbol;
}

export type RequestLimit = t.Branded<number, RequestLimitBrand>;
export const RequestLimitCodec = t.brand(t.number, (n): n is RequestLimit => n > 0 && n < 8294401, 'RequestLimit');
