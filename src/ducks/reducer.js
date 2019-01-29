import * as plants from '../services/plants';

const initialState = {
    plants: [],
    plantsLoading:false,
    projects: [],
    user: {},
    username: '',
    id: ''
}

const UPDATE_USERNAME = 'UPDATE_USERNAME'
const UPDATE_ID = 'UPDATE_ID'

export function updateUsername (username) {
    return {
        type: UPDATE_USERNAME,
        payload: username
    }
}

export function updateId (id) {
    return {
        type: UPDATE_ID,
        payload: id
    }
}

//ACTION TYPES
//FETCH PLANT DATA
const GET_PLANTS = 'GET_PLANTS';
const GET_PLANTS_PENDING = 'GET_PLANTS_PENDING';
const GET_PLANTS_FULFILLED = 'GET_PLANTS_FULFILLED'

export const getPlants = () => {
    return {
        type: GET_PLANTS,
        payload:plants.getPlants(),
    }
}


export default function reducer(state = initialState, action) {
    console.log(action)

    switch (action.type) {

        case GET_PLANTS_PENDING:
        return {...state, plantsLoading:true};

        case GET_PLANTS_FULFILLED:
        return {...state, plantsLoading:false, plants:action.payload}

        case UPDATE_USERNAME:
            return {...state, username: action.payload}

        case UPDATE_ID:
            return {...state, id: action.payload} 
        
        default:
            return state;
    }
}