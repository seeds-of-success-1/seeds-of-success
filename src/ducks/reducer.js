import * as plants from '../services/plants';

const initialState = {
    plants: [],
    plantsLoading:false,
    projects: [],
    user: {},
    username: '',
    id: ''
}




//ACTION TYPES
const UPDATE_USERNAME = 'UPDATE_USERNAME';
const UPDATE_ID = 'UPDATE_ID'
const UPDATE_PROJECTS = 'UPDATE_PROJECTS';

const GET_PLANTS = 'GET_PLANTS';
const GET_PLANTS_PENDING = 'GET_PLANTS_PENDING';
const GET_PLANTS_FULFILLED = 'GET_PLANTS_FULFILLED';

//UPDATE USER INFO
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
export const updateProjects = (projects) =>{
    return {
        type:UPDATE_PROJECTS,
        payload:projects
    }
}

//FETCH PLANT DATA
export const getPlants = () => {
    return {
        type: GET_PLANTS,
        payload:plants.getPlants(),
    }
}


export default function reducer(state = initialState, action) {

    switch (action.type) {

        case GET_PLANTS_PENDING:
        return {...state, plantsLoading:true};

        case GET_PLANTS_FULFILLED:
        return {...state, plantsLoading:false, plants:action.payload.filter(plant => plant.id !== 42).sort((a,b) => {
            if(a.name > b.name) {
                return 1
            } else if (a.name < b.name) {
                return -1
            } else return 0
        })}

        case UPDATE_USERNAME:
            return {...state, username: action.payload}

        case UPDATE_ID:
            return {...state, id: action.payload};

        case UPDATE_PROJECTS:
        return {...state, projects:action.payload};

        default:
            return state;
    }
}