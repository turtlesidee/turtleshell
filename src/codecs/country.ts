/* istanbul ignore file */
import * as t from 'io-ts';

export const FRANCE = 'france' as Country;
export const UNITED_KINGDOM = 'united_kingdom' as Country;
export const NETHERLANDS = 'netherlands' as Country;
export const GERMANY = 'germany' as Country;
export const BELGIUM = 'belgium' as Country;
export const ITALY = 'italy' as Country;
export const SPAIN = 'spain' as Country;
export const POLAND = 'poland' as Country;
export const RUSSIA = 'russia' as Country;
export const MOROCCO = 'morocco' as Country;

export const COUNTRIES: Country[] = [
    FRANCE,
    UNITED_KINGDOM,
    NETHERLANDS,
    BELGIUM,
    ITALY,
    SPAIN,
    POLAND,
    RUSSIA,
    MOROCCO,
    GERMANY,
];

export interface CountryBrand {
    readonly country: unique symbol;
}

export type Country = t.Branded<string, CountryBrand>;
export const CountryCodec = t.brand(t.string, (s): s is Country => COUNTRIES.includes(s as Country), 'country');
