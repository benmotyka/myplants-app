import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import plants from 'store/reducers/plants'
import user from 'store/reducers/user'
import notifications from 'store/reducers/notifications'

const persistConfig = {
    key: 'userDetails',
    storage: AsyncStorage,
  };


const appReducer = combineReducers({
    plants,
    notifications,
    user: persistReducer(persistConfig, user)
});

export default appReducer;

export type State = ReturnType<typeof appReducer>