import { UserDetails } from 'interfaces/UserDetails';
import { SET_USER_DETAILS, REMOVE_USER_DETAILS } from 'store/types';

const setUserDetails = (payload: UserDetails) => { 
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