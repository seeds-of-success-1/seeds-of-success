import * as plants from '../services/plants';

const initialState = {
    plants: [],
    plantsLoading:false,
    projects: [],
    user: {}
}

//ACTION TYPES

const UPDATE_PROJECTS = 'UPDATE_PROJECTS'


const GET_PLANTS = 'GET_PLANTS';
const GET_PLANTS_PENDING = 'GET_PLANTS_PENDING';
const GET_PLANTS_FULFILLED = 'GET_PLANTS_FULFILLED';

// FETCH AND UPDATE USER DATA


export const updateProjects = (projects) =>{
    return{
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
    console.log(action)

    switch (action.type) {

        case GET_PLANTS_PENDING:
        return {...state, plantsLoading:true};

        case GET_PLANTS_FULFILLED:
        return {...state, plantsLoading:false, plants:action.payload}

        default:
            return state;
    }
}