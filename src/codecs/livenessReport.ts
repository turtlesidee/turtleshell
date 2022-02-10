import * as t from 'io-ts';

export const LivenessReportCodec = t.type({
    user_has_smiled: t.boolean,
    user_has_blinked: t.boolean,
    user_has_turned_left: t.boolean,
    user_has_turned_right: t.boolean,
    same_person_on_all_photos: t.boolean,
    remark: t.string,
});

export type LivenessReport = t.TypeOf<typeof LivenessReportCodec>;
