/* istanbul ignore file */
import * as t from 'io-ts';

export const ID_CARD = 'id_card' as IdentityDocument;
export const PASSPORT = 'passport' as IdentityDocument;
export const DRIVER_PERMIT = 'driver_permit' as IdentityDocument;
export const RESIDENCY_PERMIT = 'residency_permit' as IdentityDocument;

export const IDENTITY_DOCUMENTS: IdentityDocument[] = [ID_CARD, PASSPORT, DRIVER_PERMIT, RESIDENCY_PERMIT];

export interface IdentityDocumentBrand {
    readonly IdentityDocument: unique symbol;
}

export type IdentityDocument = t.Branded<string, IdentityDocumentBrand>;
export const IdentityDocumentCodec = t.brand(
    t.string,
    (s): s is IdentityDocument => IDENTITY_DOCUMENTS.includes(s as IdentityDocument),
    'IdentityDocument',
);
