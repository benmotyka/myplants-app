import { UserSettings } from "interfaces/UserSettings";
import {
  REMOVE_USER_DETAILS,
  SET_USER_SETTINGS,
} from "store/types";

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
  removeUserDetails,
  setUserSettings
};
