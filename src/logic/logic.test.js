import { toggle } from './logic';
import {updateModal,updateUsername,updateRecent,updateAfterSave} from '../ducks/reducer';

describe('Tests Toggle Show button', () => {
    test('when given true, returns false', () => {
        expect(toggle(true)).toBe(false)
    })

    test('when given false, returns true', () => {
        expect(toggle(false)).toBe(true)
    })

    test('if given an object, should return false', () => {
        expect(toggle({})).toBe(false)
    })

    test('if given a 0, should return true', () => {
        expect(toggle(0)).toBe(true)
    })
});
//CS
describe('Tests updateModal', () => {
    test('when given true, payload returns true', () => {
        let result = updateModal(true);
        expect(result.payload).toBe(true)
    })

    test('when given false, payload returns false', () => {
        let result = updateModal(false);
        expect(result.payload).toBe(false)
    })

    test('When called, should return type UPDATE_PLANT_MODAL', () => {
        let result = updateModal();
        expect(result.type).toBe("UPDATE_PLANT_MODAL")
    })

    test('When called should always return an object', () => {
        let result = updateModal();
        expect(typeof result).toBe('object')
    })

    test('When called should always return an object with two properties', () => {
        let result = updateModal();
        expect(Object.keys(result).length).toBe(2)
    });

    test('When called should always return an object with two properties type & payload', () => {
        let result = updateModal();
        expect(result).toHaveProperty("type");
        expect(result).toHaveProperty("payload");

    });
});
//CS
//DC
describe('Testing updateRecent', () => {
    const UPDATE_RECENT = 'UPDATE_RECENT';
    const value = 5
    test('Should never return null', () => {
        expect(updateRecent()).not.toBeNull()
    })
    test('Should return a truthy value', () => {
        expect(updateRecent()).toBeTruthy()
    })
    test('If nothing is passed in, should have payload equal to undefined', () => {
        expect(updateRecent()).toHaveProperty('payload', undefined)
    })
    test('Should successfully update payload property based on value passed in', () => {
        expect(updateRecent(value)).toHaveProperty('payload', value)
    })
    test('Should always return an object with type equal to UPDATE_RECENT', () => {
        expect(updateRecent()).toHaveProperty('type', UPDATE_RECENT)
    })
    test('Should not modify value passed in', () => {
        updateRecent(value)
        expect(value).toBe(5)
    })
})
//DC
//BS
describe('Tests updateUsername', () => {
    test('should return a payload with the same value that was passed in for username', () => {
        let result = updateUsername('greg');
        expect(result.payload).toBe('greg')
    })

    test('should return object with property of type and payload', () => {
        let result = updateUsername('greg');
        expect(result).toHaveProperty("type");
    })

    test('should return object with property of payload', () => {
        let result = updateUsername('greg');
        expect(result).toHaveProperty("payload");
    })

    test('Should return type UPDATE_USERNAME', () => {
        let result = updateUsername();
        expect(result.type).toBe("UPDATE_USERNAME")
    })

    test('Should always return an object', () => {
        let result = updateUsername();
        expect(typeof result).toBe('object')
    })
})
//BS
//RI
describe('Tests updateAfterSave', () => {
    test('should return a payload with the same value that was passed in for project', () => {
        let result = updateAfterSave('Taste the Rainbow');
        expect(result.payload).not.toBe('Taste the Raindbow')
    })

    test('should return object with property of payload', () => {
        let result = updateAfterSave('Taste The Rainbow');
        expect(result).toHaveProperty("payload");
    })

    test('Should not return a string', () => {
        let result = updateAfterSave();
        expect(typeof result).not.toBe('string')
    })

    test('Should not return and array', () => {
        let result = updateAfterSave();
        expect(typeof result).not.toBe('array')
    })
    test('Should not return null', () => {
        let result = updateAfterSave();
        expect(typeof result).not.toBe(null)
    })
})
//RI