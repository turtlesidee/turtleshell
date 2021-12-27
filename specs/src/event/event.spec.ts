import { create_metadata_event, is_event } from '../../../src/event/event';

describe('create_metadata_event function', () => {
    test('should return meta_data_event correctly formatted', () => {
        const meta_data_event = create_metadata_event({ who: 'root' }, { name: 'my_event', version: '1.0.0' });
        expect(meta_data_event.who).toBe('root');
        expect(meta_data_event.type.name).toBe('my_event');
        expect(meta_data_event.type.version).toBe('1.0.0');
    });
});

describe('is_event function', () => {
    const is_my_event = is_event('my_event');
    const my_event = {
        metadata: {
            who: 'root',
            when: 10000,
            id: 'id',
            type: { name: 'my_event', version: '1.0.0' },
        },
        data: { value: 1 },
    };

    const my_second_event = {
        metadata: {
            who: 'root',
            when: 10000,
            id: 'id',
            type: { name: 'my_second_event', version: '1.0.0' },
        },
        data: { value: 1 },
    };

    test('should return true when correct event is provided', () => {
        expect(is_my_event(my_event)).toBeTruthy();
    });

    test('should return false when incorrect event is provided', () => {
        expect(is_my_event(my_second_event)).toBeFalsy();
    });

    test('should return false when non-event is provided', () => {
        expect(is_my_event(1)).toBeFalsy();
    });
});
