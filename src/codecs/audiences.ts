/* istanbul ignore file */
import * as t from 'io-ts';

export const AUTHORIZATION_SERVICE = 'authorization_service' as Audience;
export const BUSINESS_SERVICE = 'business_service' as Audience;
export const ONBOARDING_SERVICE = 'onboarding_service' as Audience;
export const MACHINE_LEARNING_SERVICE = 'machine_learning_service' as Audience;
export const USER_SERVICE = 'user_service' as Audience;

export const AUDIENCE: Audience[] = [
    AUTHORIZATION_SERVICE,
    BUSINESS_SERVICE,
    ONBOARDING_SERVICE,
    MACHINE_LEARNING_SERVICE,
    USER_SERVICE,
];

export interface AudienceBrand {
    readonly Audience: unique symbol;
}

export type Audience = t.Branded<string, AudienceBrand>;
export const AudienceCodec = t.brand(t.string, (s): s is Audience => true, 'Audience');
