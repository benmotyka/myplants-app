import { Plant } from 'interfaces/Plant';
import { SET_USER_PLANTS } from 'store/types';

const setUserPlants = (payload: Plant[]) => { 
  return({
    type: SET_USER_PLANTS,
    payload,
  })};
  
  export default {
    setUserPlants,
  };