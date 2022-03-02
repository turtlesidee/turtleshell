import * as t from 'io-ts';

export const READ_BUSINESS = 'read:business' as Claim;
export const READ_BUSINESS_SCOPE = 'read:business_scope' as Claim;
export const WRITE_BUSINESS = 'write:business' as Claim;

export const READ_USER = 'read:user' as Claim;
export const WRITE_USER = 'write:user' as Claim;

export const WRITE_ONBOARDING_REQUEST = 'write:onboarding_request' as Claim;
export const REVIEW_ONBOARDING_REQUEST = 'review:onboarding_request' as Claim;
export const READ_ONBOARDING_REQUEST = 'read:onboarding_request' as Claim;
export const MULTIPLE_ONBOARDING_REQUEST = 'multiple:onboarding_request' as Claim;

export const EXECUTE_CLASSIFICATION = 'execute:classification' as Claim;
export const EXECUTE_EXTRACTION = 'execute:extraction' as Claim;

/* istanbul ignore file */
export const OPERATOR = 'operator' as Claim;
export const OPERATOR_EXPERT_BIOMETRIC = 'expert_biometric' as Claim;
export const OPERATOR_EXPERT_DOCUMENT = 'expert_document' as Claim;
export const ROOT = 'root' as Claim;

export const CLAIMS: Claim[] = [
    READ_BUSINESS,
    READ_BUSINESS_SCOPE,
    READ_USER,
    WRITE_USER,
    WRITE_BUSINESS,
    WRITE_ONBOARDING_REQUEST,
    REVIEW_ONBOARDING_REQUEST,
    READ_ONBOARDING_REQUEST,
    OPERATOR,
    OPERATOR_EXPERT_DOCUMENT,
    OPERATOR_EXPERT_BIOMETRIC,
    EXECUTE_CLASSIFICATION,
    EXECUTE_EXTRACTION,
    ROOT,
];

export interface ClaimBrand {
    readonly Claim: unique symbol;
}

export type Claim = t.Branded<string, ClaimBrand>;

export const ClaimCodec = t.brand(
    t.string,
    (s): s is Claim => {
        return true;
    },
    'Claim',
);
