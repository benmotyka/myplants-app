import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';

import appReducer from 'store/reducers';

export const store = createStore(appReducer, applyMiddleware(thunk));

export const persistor = persistStore(store);
