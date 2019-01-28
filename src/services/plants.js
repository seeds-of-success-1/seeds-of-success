import axios from 'axios';
import {getPlantKey} from '../config';

export const getPlants = function(){
    console.log('hello from getPlants')
    return axios.get(`http://harvesthelper.herokuapp.com/api/v1/plants?api_key=${getPlantKey()}`)
    .then(res => res.data);
}