import { IUserDetails } from '../../interfaces/IUserDetails';
import { SET_USER_DETAILS, REMOVE_USER_DETAILS } from '../types';

const setUserDetails = (payload: IUserDetails) => { 
  return({
    type: SET_USER_DETAILS,
    payload,
  })};

const removeUserDetails = () => { 
  return({
    type: REMOVE_USER_DETAILS,
})};
  
  export default {
    setUserDetails,
    removeUserDetails
  };