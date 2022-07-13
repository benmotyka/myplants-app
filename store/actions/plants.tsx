import { IPlant } from '../../interfaces/IPlant';
import { SET_USER_PLANTS } from '../types';

const setUserPlants = (payload: IPlant[]) => { 
  return({
    type: SET_USER_PLANTS,
    payload,
  })};
  
  export default {
    setUserPlants,
  };