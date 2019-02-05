import { toggle } from './logic';
import {updateModal} from '../ducks/reducer'

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
