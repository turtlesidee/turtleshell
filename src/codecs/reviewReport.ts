import * as t from 'io-ts';
import { DocumentIDCardReportCodec } from './documentIdCardReport';
import { LivenessReportCodec } from './livenessReport';

export const ReviewReportCodec = t.type({
    document: DocumentIDCardReportCodec,
    liveness: LivenessReportCodec,
});

export type ReviewReport = t.TypeOf<typeof ReviewReportCodec>;

export const ReviewBiometricReportCodec = t.type({
    liveness: LivenessReportCodec,
});

export type ReviewBiometricReport = t.TypeOf<typeof ReviewBiometricReportCodec>;

export const ReviewDocumentReportCodec = t.type({
    document: DocumentIDCardReportCodec,
});

export type ReviewDocumentReport = t.TypeOf<typeof ReviewDocumentReportCodec>;
