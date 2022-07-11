import { IPlant } from '../../interfaces/IPlant';
import { USER_PLANTS } from '../types';

const setUserPlants = (payload: IPlant[]) => { 
  return({
    type: USER_PLANTS,
    payload,
  })};
  
  export default {
    setUserPlants,
  };