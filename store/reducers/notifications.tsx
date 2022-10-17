import { HIDE_TOAST, SET_NOTIFICATIONS_TOKEN, SHOW_TOAST } from "store/types";

interface State {
  notificationToken: string;
  showToast: boolean;
}

interface Action {
  type: string;
  payload: string;
}

const initialstate: State = {
  notificationToken: "",
  showToast: false,
};

export default (state: State = initialstate, action: Action) => {
  switch (action.type) {
    case SET_NOTIFICATIONS_TOKEN:
      return Object.assign({}, state, {
        notificationToken: action.payload,
      });
    case SHOW_TOAST:
      return Object.assign({}, state, {
        showToast: true,
      });
    case HIDE_TOAST:
      return Object.assign({}, state, {
        showToast: false,
      });
    default:
      return state;
  }
};
