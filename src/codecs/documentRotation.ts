import * as t from 'io-ts';

export const ROTATION_0 = '0' as DocumentRotation;
export const ROTATION_90 = '90' as DocumentRotation;
export const ROTATION_180 = '180' as DocumentRotation;
export const ROTATION_270 = '270' as DocumentRotation;

export const ROTATIONS: DocumentRotation[] = [ROTATION_0, ROTATION_90, ROTATION_180, ROTATION_270];

interface DocumentRotationBrand {
    readonly DocumentRotation: unique symbol;
}

export type DocumentRotation = t.Branded<string, DocumentRotationBrand>;
export const DocumentRotationCodec = t.brand(
    t.string,
    (s): s is DocumentRotation => ROTATIONS.includes(s as DocumentRotation),
    'DocumentRotation',
);
