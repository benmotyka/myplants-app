import { combineReducers } from 'redux';
import plants from './plants'
import user from './user'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';

const persistConfig = {
    key: 'userDetails',
    storage: AsyncStorage,
    // whitelist: ['bookmarks']
  };


const appReducer = combineReducers({
    plants,
    user: persistReducer(persistConfig, user)
});

export default appReducer;

export type State = ReturnType<typeof appReducer>