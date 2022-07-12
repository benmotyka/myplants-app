import { combineReducers } from 'redux';
import plants from './plants'
import user from './user'


const appReducer = combineReducers({
    plants,
    user
});

export default appReducer;

export type State = ReturnType<typeof appReducer>