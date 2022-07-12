import { IUserDetails } from '../../interfaces/IUserDetails';
import { USER_DETAILS } from '../types';

const setUserDetails = (payload: IUserDetails) => { 
  return({
    type: USER_DETAILS,
    payload,
  })};
  
  export default {
    setUserDetails,
  };