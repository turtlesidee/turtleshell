import { Aggregate } from '../../../src/aggregate/types';

export const enter_event = { id: 1, value: '10', type: 'enter_event' };
export const leave_event = { id: 1, value: '12', type: 'leave_event' };
export const talk_event = { id: 1, value: 'hi', type: 'talk_event' };

export type AggregateState = {
    enter_at: null | string;
    leave_at: null | string;
    talk: string[];
};

export type AggregateEvent = typeof enter_event | typeof leave_event | typeof talk_event;

export const initial_state: AggregateState = {
    enter_at: null,
    leave_at: null,
    talk: [],
};

export const aggregate: Aggregate<AggregateEvent, AggregateState> = {
    events: [],
    retrieved_events: [],
    state: initial_state,
};

export const apply_enter_event = (aggregate: Aggregate<AggregateEvent, AggregateState>, event: typeof enter_event) => {
    return {
        ...aggregate,
        events: [...aggregate.events, event],
        state: {
            ...aggregate.state,
            enter_at: event.value,
        },
    };
};

export const apply_leave_event = (aggregate: Aggregate<AggregateEvent, AggregateState>, event: typeof leave_event) => {
    return {
        ...aggregate,
        events: [...aggregate.events, event],
        state: {
            ...aggregate.state,
            leave_at: event.value,
        },
    };
};

export const apply_talk_event = (aggregate: Aggregate<AggregateEvent, AggregateState>, event: typeof talk_event) => {
    return {
        ...aggregate,
        events: [...aggregate.events, event],
        state: {
            ...aggregate.state,
            talk: [...aggregate.state.talk, event.value],
        },
    };
};

export const addEvent = (
    aggregate: Aggregate<AggregateEvent, AggregateState>,
    event: AggregateEvent,
): Aggregate<AggregateEvent, AggregateState> => {
    if (event.type === 'enter_event') {
        return apply_enter_event(aggregate, event);
    }
    if (event.type === 'leave_event') {
        return apply_leave_event(aggregate, event);
    }
    if (event.type === 'talk_event') {
        return apply_talk_event(aggregate, event);
    }

    return aggregate;
};
