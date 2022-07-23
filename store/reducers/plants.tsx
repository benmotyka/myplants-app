import { Plant } from "interfaces/Plant";
import { SET_USER_PLANTS } from "store//types";

interface State {
  userPlants: Plant[];
}

interface Action {
  type: string;
  payload: Plant[];
};

const initialstate: State = {
    userPlants: [],
  };
  
export default (state: State = initialstate, action: Action) => {
  switch (action.type) {
    case SET_USER_PLANTS:
      return Object.assign({}, state, {
        userPlants: action.payload,
      });
    default:
      return state;
  }
};
