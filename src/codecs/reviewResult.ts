import * as t from 'io-ts';

export const VALIDATED = 'validated' as ReviewResult;
export const REJECTED = 'rejected' as ReviewResult;
export const NO_ANSWER = 'no_answer' as ReviewResult;

export const REVIEW_RESULT: ReviewResult[] = [VALIDATED, REJECTED, NO_ANSWER];

export interface ReviewResultBrand {
    readonly ReviewResult: unique symbol;
}

export type ReviewResult = t.Branded<string, ReviewResultBrand>;
export const ReviewResultCodec = t.brand(
    t.string,
    (s): s is ReviewResult => REVIEW_RESULT.includes(s as ReviewResult),
    'ReviewResult',
);
