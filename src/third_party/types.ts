export type MongoConfiguration = {
    uri: string;
    user: string;
    password: string;
    database: string;
};

export interface S3Configuration {
    access_key_id: string;
    secret_access_key: string;
    region: string;
    s3_bucket_name: string;
}
