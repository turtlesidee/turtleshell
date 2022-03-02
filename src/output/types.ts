export type Failed<T> = {
    status: 'failed';
    message: string;
    http_code: number;
    description?: T;
    internal?: string;
};

export type Succeeded<K> = {
    status: 'success';
    message: string;
    http_code: number;
    payload?: K;
    internal?: string;
};
