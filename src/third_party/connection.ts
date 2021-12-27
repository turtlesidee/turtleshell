import * as ably from 'ably';
import { S3 } from 'aws-sdk';
import { Collection, MongoClient } from 'mongodb';
import { MongoConfiguration, S3Configuration } from './types';

/**
 * Instanciate connection to mongo server
 **/
export const connect_to_mongodb = async (configuration: MongoConfiguration): Promise<MongoClient> => {
    const uri = `mongodb+srv://${configuration.user}:${configuration.password}@${configuration.uri}/${configuration.database}`;

    const client = new MongoClient(uri);

    client.on('open', () => {
        console.log('connection mongo successful');
    });

    try {
        await client.connect();
        return client;
    } catch (e) {
        console.log('connection mongo failed');
        process.exit(1);
    }
};

/**
 * Get collection from mongo
 **/
export const connect_to_collection = (client: MongoClient, database: string, collection: string): Collection =>
    client.db(database).collection(collection);

/**
 * Instanciate connection to ably server
 **/
export const connect_to_ably = (key: string): ably.Realtime => {
    const client = new ably.Realtime({ key });

    client.connection.on('connected', () => {
        console.log('Connection to ably successful');
    });

    client.connection.on('failed', () => {
        console.log('Connection to ably failed');
        process.exit(1);
    });

    return client;
};

/**
 * Instanciate connection to ably channel
 **/
export const connect_to_ably_channel = (
    client: ably.Realtime,
    channel_name: string,
    channel_secret: string,
): ably.Types.RealtimeChannelCallbacks => client.channels.get(channel_name, { cipher: { key: channel_secret } });

/**
 * Instanciate connection to S3
 **/
export const connect_to_S3 = (configuration: S3Configuration): S3 =>
    new S3({ accessKeyId: configuration.access_key_id, secretAccessKey: configuration.secret_access_key });
