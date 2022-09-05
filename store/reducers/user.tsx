import { UserDetails } from "interfaces/UserDetails";
import { UserSettings } from "interfaces/UserSettings";
import {
  SET_USER_DETAILS,
  REMOVE_USER_DETAILS,
  SET_USER_SETTINGS,
} from "store/types";

interface State {
  userDetails: UserDetails;
  userSettings?: UserSettings;
}

interface Action {
  type: string;
  payload: UserDetails | UserSettings;
}

const initialstate: State = {
  userDetails: {
    jwt: null,
    username: null,
    confirmedEmail: true
  },
  userSettings: {
    pushNotificationsEnabled: false,
  },
};

export default (state: State = initialstate, action: Action) => {
  switch (action.type) {
    case SET_USER_DETAILS:
      return Object.assign({}, state, {
        userDetails: action.payload,
      });
    case REMOVE_USER_DETAILS:
      return {
        userDetails: {
          jwt: null,
          username: null,
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
