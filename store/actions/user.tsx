import { UserDetails } from "interfaces/UserDetails";
import { UserSettings } from "interfaces/UserSettings";
import {
  SET_USER_DETAILS,
  REMOVE_USER_DETAILS,
  SET_USER_SETTINGS,
} from "store/types";

const setUserDetails = (payload: UserDetails) => {
  return {
    type: SET_USER_DETAILS,
    payload,
  };
};

const removeUserDetails = () => {
  return {
    type: REMOVE_USER_DETAILS,
  };
};

const setUserSettings = (payload: UserSettings) => {
  return {
    type: SET_USER_SETTINGS,
    payload,
  };
};

export default {
  setUserDetails,
  removeUserDetails,
  setUserSettings
};
