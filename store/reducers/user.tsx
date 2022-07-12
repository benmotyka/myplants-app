import { IUserDetails } from "../../interfaces/IUserDetails";
import { USER_DETAILS } from "../types";

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
        username: null
    },
};

export default (state: IState = initialstate, action: Action) => {
  switch (action.type) {
    case USER_DETAILS:
      return Object.assign({}, state, {
        userDetails: action.payload,
      });
    default:
      return state;
  }
};
