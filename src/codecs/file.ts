import * as t from 'io-ts';

export const FileCodec = t.type({
    fieldname: t.string,
    mimetype: t.string,
    location: t.string,
    key: t.string,
});

export type File = t.TypeOf<typeof FileCodec>;
