import { RetrieveAggregateFunction, SaveAggregateFunction, DispatchAggregateEventFunction } from '../aggregate/types';

interface CommandContext<T, K> {
    retrieveFn: RetrieveAggregateFunction<T, K>;
    saveFn: SaveAggregateFunction<T, K>;
    dispatchFn: DispatchAggregateEventFunction<T>;
}

export interface MetadataCommand {
    who: string;
}

export interface Command<T, K, X> {
    context: CommandContext<T, K>;
    metadata: MetadataCommand;
    data: X;
}
