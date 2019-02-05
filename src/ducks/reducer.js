import * as plants from '../services/plants';

const initialState = {
    plants: [],
    plantsLoading: false,
    projects: [],
    username: '',
    id: '',
    plantModalOpen:false,
    recentProject: ''
}




//ACTION TYPES
const UPDATE_USERNAME = 'UPDATE_USERNAME';
const UPDATE_ID = 'UPDATE_ID';
const UPDATE_PROJECTS = 'UPDATE_PROJECTS';
const UPDATE_RECENT = 'UPDATE_RECENT';
const UPDATE_AFTER_SAVE = 'UPDATE_AFTER_SAVE';
const UPDATE_USER = 'UPDATE_USER'

const GET_PLANTS = 'GET_PLANTS';
const GET_PLANTS_PENDING = 'GET_PLANTS_PENDING';
const GET_PLANTS_FULFILLED = 'GET_PLANTS_FULFILLED';
const UPDATE_PLANT_MODAL = 'UPDATE_PLANT_MODAL';
const CLEAN_UP = "CLEAN_UP";

//UPDATE USER INFO
export const updateUser = (info) => {
    return{
        type:UPDATE_USER,
        payload:info
    }
}

export function updateRecent(id) {
    return {
        type: UPDATE_RECENT,
        payload: id
    }
}
export function updateUsername(username) {
    return {
        type: UPDATE_USERNAME,
        payload: username
    }
}

export function updateId(id) {
    return {
        type: UPDATE_ID,
        payload: id
    }
}
export const updateProjects = (projects) => {
    return {
        type: UPDATE_PROJECTS,
        payload: projects
    }
}

export const updateModal = (bool) =>{
    return {
        type:UPDATE_PLANT_MODAL,
        payload:bool
    }
}

export const cleanUpState = () =>{
    return{
        type: CLEAN_UP,
        payload:{
            projects:[],
            username:'',
            id:'',
            recentProject:null,
        }
    }
}
export const updateAfterSave = (project) => {
    return{
        type:UPDATE_AFTER_SAVE,
        payload:project
    }
}

//FETCH PLANT DATA
export const getPlants = () => {
    return {
        type: GET_PLANTS,
        payload: plants.getPlants(),
    }
}


export default function reducer(state = initialState, action) {

    switch (action.type) {

        case GET_PLANTS_PENDING:
            return { ...state, plantsLoading: true };

        case GET_PLANTS_FULFILLED:
            return {
                ...state, plantsLoading: false, plants: action.payload.filter(plant => plant.id !== 42).sort((a, b) => {
                    if (a.name > b.name) {
                        return 1
                    } else if (a.name < b.name) {
                        return -1
                    } else return 0
                })
            };

        case UPDATE_USER:
        return {...state, id:action.payload.id, username:action.payload.username, recentProject:action.payload.recentProject}

        case UPDATE_USERNAME:
            return { ...state, username: action.payload }

        case UPDATE_ID:
            return { ...state, id: action.payload };

        case UPDATE_PROJECTS:
        return {...state, projects:action.payload};

        case UPDATE_PLANT_MODAL:
        return {...state, plantModalOpen:action.payload};

        case UPDATE_RECENT:
            return { ...state, recentProject: action.payload };

        case UPDATE_AFTER_SAVE:
        let updatedProjects = [...state.projects];
        updatedProjects.splice(action.payload.index,1,action.payload.project);
        return {...state, projects:updatedProjects};



        case CLEAN_UP:
        return {...state, projects:action.payload.projects, username:action.payload.username,id:action.payload.id, recentProject:action.payload.recentProject}

        default:
            return state;
    }
}