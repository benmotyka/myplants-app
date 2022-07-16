import { IUserDetails } from "interfaces/IUserDetails";
import { SET_USER_DETAILS, REMOVE_USER_DETAILS } from "store/types";

interface IState {
  userDetails: IUserDetails;
}

interface Action {
  type: string;
  payload: IUserDetails;
}

const initialstate: IState = {
  userDetails: {
    jwt: null,
    username: null,
  },
};

export default (state: IState = initialstate, action: Action) => {
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
