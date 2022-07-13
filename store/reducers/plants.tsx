import { IPlant } from "../../interfaces/IPlant";
import { SET_USER_PLANTS } from "../types";

interface IState {
  userPlants: IPlant[];
}

interface Action {
  type: string;
  payload: IPlant[];
};

const initialstate: IState = {
    userPlants: [],
  };
  
export default (state: IState = initialstate, action: Action) => {
  switch (action.type) {
    case SET_USER_PLANTS:
      return Object.assign({}, state, {
        userPlants: action.payload,
      });
    default:
      return state;
  }
};
