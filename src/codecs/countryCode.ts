/* istanbul ignore file */
import * as t from 'io-ts';

export const FR = 'fr' as CountryCode;
export const GB = 'gb' as CountryCode;
export const NL = 'nl' as CountryCode;
export const DE = 'de' as CountryCode;
export const RU = 'ru' as CountryCode;
export const ES = 'es' as CountryCode;
export const IT = 'it' as CountryCode;
export const PL = 'pl' as CountryCode;
export const MA = 'ma' as CountryCode;
export const BE = 'be' as CountryCode;

export const COUNTRIES_CODE: CountryCode[] = [FR, GB, NL, DE, RU, ES, IT, PL, MA, BE];

export interface CountryCodeBrand {
    readonly CountryCode: unique symbol;
}

export type CountryCode = t.Branded<string, CountryCodeBrand>;
export const CountryCodeCodec = t.brand(
    t.string,
    (s): s is CountryCode => COUNTRIES_CODE.includes(s as CountryCode),
    'CountryCode',
);
