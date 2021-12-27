export interface EventType {
    name: string;
    version: string;
}

export interface MetadataEvent {
    who: string;
    when: number;
    id: string;
    type: EventType;
}

export interface Event<T> {
    metadata: MetadataEvent;
    data: T;
}
