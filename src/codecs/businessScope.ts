/* istanbul ignore file */
import * as t from 'io-ts';
import { CountryCodec } from './country';
import { CountryCodeCodec } from './countryCode';
import { IdentityDocumentCodec } from './identityDocument';

export const BusinessScopeCodec = t.type({
    country: CountryCodec,
    country_code: CountryCodeCodec,
    documents: t.array(IdentityDocumentCodec),
});

export type BusinessScope = t.TypeOf<typeof BusinessScopeCodec>;
