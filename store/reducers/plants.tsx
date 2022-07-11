import { USER_PLANTS } from '../types';

const initialstate = {
    userPlants: [],
};

type Action = {
    type: string,
    payload?: any
}

export default (state: any = initialstate, action: Action) => {
    console.log('hejaa')
    switch (action.type) {
        case USER_PLANTS:
            return Object.assign({}, state, {
                userPlants: action.payload,
            });
        default:
            return state;
    }
};