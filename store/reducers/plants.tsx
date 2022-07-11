import { IPlant } from '../../interfaces/IPlant';
import { USER_PLANTS } from '../types';

const initialstate = {
    userPlants: [],
};

type Action = {
    type: string,
    payload: IPlant[]
}

export default (state: any = initialstate, action: Action) => {
    switch (action.type) {
        case USER_PLANTS:
            return Object.assign({}, state, {
                userPlants: action.payload,
            });
        default:
            return state;
    }
};