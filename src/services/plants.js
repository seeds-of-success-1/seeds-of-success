import axios from 'axios';
import {getPlantKey} from '../config';

export const getPlants = function(){
    return axios.get(`https://harvesthelper.herokuapp.com/api/v1/plants?api_key=${getPlantKey()}`)
    .then(res => res.data);
}