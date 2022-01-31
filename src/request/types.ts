import { Validation } from 'io-ts';
import { JwtTokenDecoded } from '../codecs';

export interface Codec<T> {
    decode: (d: unknown) => Validation<T>;
}

export type FormatAuthorizationFn<T, R> = ({
    request,
    jwt_token_decoded,
}: {
    request: T;
    jwt_token_decoded: JwtTokenDecoded;
}) => R;

export type FormatFn<T, R> = ({ request }: { request: T }) => R;
