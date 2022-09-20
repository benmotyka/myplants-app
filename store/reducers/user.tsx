import { UserSettings } from "interfaces/UserSettings";
import {
  REMOVE_USER_DETAILS,
  SET_USER_SETTINGS,
} from "store/types";

interface State {
  userSettings?: UserSettings;
}

interface Action {
  type: string;
  payload: UserSettings;
}

const initialstate: State = {
  userSettings: {
    pushNotificationsEnabled: false,
  },
};

export default (state: State = initialstate, action: Action) => {
  switch (action.type) {
    case REMOVE_USER_DETAILS:
      return {
        userDetails: {
          jwt: null,
          username: null,
          confirmedEmail: false
        }
      };
    case SET_USER_SETTINGS:
      return Object.assign({}, state, {
        userSettings: action.payload,
      });
    default:
      return state;
  }
};
