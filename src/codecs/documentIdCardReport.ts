import * as t from 'io-ts';

export const DocumentIDCardReportCodec = t.type({
    verif_mrz_vs_viz: t.boolean,
    initial_on_photo: t.boolean,
    card_number_valid: t.boolean,
    vertical_character_alignment_on_mrz: t.boolean,
    typography: t.boolean,
    anamorphic_caracters: t.boolean,
    optically_variable_ink_prints: t.boolean,
    printing_technique: t.boolean,
    data_and_photo_below_print_background: t.boolean,
    letter_smaller_than_number_on_mrz_tape: t.boolean,
    photo_not_manipulated: t.boolean,
    angles_rounded: t.boolean,
    rf_protrude_on_each_side: t.boolean,
    document_valid: t.boolean,
    iridescent_ink: t.boolean,
    rf_on_card_side: t.boolean,
    streaks_around_the_map: t.boolean,
    remark: t.string,
});

export type DocumentIDCardReport = t.TypeOf<typeof DocumentIDCardReportCodec>;
