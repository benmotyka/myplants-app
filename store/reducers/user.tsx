import { UserDetails } from "interfaces/UserDetails";
import { SET_USER_DETAILS, REMOVE_USER_DETAILS } from "store/types";

interface State {
  userDetails: UserDetails;
}

interface Action {
  type: string;
  payload: UserDetails;
}

const initialstate: State = {
  userDetails: {
    jwt: null,
    username: null,
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
        },
      };
    default:
      return state;
  }
};
