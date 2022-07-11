import { combineReducers } from 'redux';
import plants from './plants'


const appReducer = combineReducers({
    plants
});

export default appReducer;

export type State = ReturnType<typeof appReducer>