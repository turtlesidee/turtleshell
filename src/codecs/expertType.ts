/* istanbul ignore file */
import * as t from 'io-ts';

export const EXPERT_BIOMETRIC = 'expert_biometric' as ExpertType;
export const EXPERT_DOCUMENT = 'expert_document' as ExpertType;

export const EXPERT_TYPES: ExpertType[] = [EXPERT_BIOMETRIC, EXPERT_DOCUMENT];

export interface ExpertTypeBrand {
    readonly ExpertType: unique symbol;
}

export type ExpertType = t.Branded<string, ExpertTypeBrand>;
export const ExpertTypeCodec = t.brand(
    t.string,
    (s): s is ExpertType => EXPERT_TYPES.includes(s as ExpertType),
    'ExpertType',
);
