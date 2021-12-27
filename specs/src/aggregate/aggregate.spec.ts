import { addEvent, enter_event, initial_state, leave_event, talk_event } from './aggregate.mock';
import { get_new_events, hydrate } from '../../../src/aggregate/aggregate';

const events = [enter_event, talk_event, leave_event];

describe('hydrate function', () => {
    test('should return aggregate with all events provided applied', () => {
        const aggregate = { events: [], retrieved_events: [], state: initial_state };

        const aggregate_updated = hydrate(addEvent, events, aggregate);
        const aggregate_expected = {
            events,
            retrieved_events: events,
            state: {
                enter_at: '10',
                leave_at: '12',
                talk: ['hi'],
            },
        };

        expect(aggregate_updated).toStrictEqual(aggregate_expected);
    });
});

describe('get_new_events_function', () => {
    test('should return new events', () => {
        const aggregate = {
            events,
            retrieved_events: [enter_event, talk_event],
            state: {
                enter_at: '10',
                leave_at: null,
                talk: ['hi'],
            },
        };

        expect(get_new_events(aggregate)).toStrictEqual([leave_event]);
    });
});
