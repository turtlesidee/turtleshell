/* istanbul ignore file */
import * as t from 'io-ts';

export const SMILE = 'smile' as Challenge;
export const LEFT = 'left' as Challenge;
export const RIGHT = 'right' as Challenge;
export const BLINK = 'blink' as Challenge;

export const CHALLENGES: Challenge[] = [SMILE, LEFT, RIGHT, BLINK];

export interface ChallengeBrand {
    readonly Challenge: unique symbol;
}

export type Challenge = t.Branded<string, ChallengeBrand>;

export const ChallengeCodec = t.brand(
    t.string,
    (s): s is Challenge => CHALLENGES.includes(s as Challenge),
    'Challenge',
);
