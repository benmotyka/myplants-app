import { SET_NOTIFICATIONS_TOKEN } from "store/types";

interface State {
  notificationToken: string;
}

interface Action {
  type: string;
  payload: string;
}

const initialstate: State = {
  notificationToken: "",
};

export default (state: State = initialstate, action: Action) => {
  switch (action.type) {
    case SET_NOTIFICATIONS_TOKEN:
      return Object.assign({}, state, {
        notificationToken: action.payload,
      });
    default:
      return state;
  }
};
