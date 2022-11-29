import mainReducer from './slices';
import { configureStore } from '@reduxjs/toolkit';
import { applyMiddleware, combineReducers } from 'redux';
import { rootEpic } from '../epics';
import { createEpicMiddleware } from 'redux-observable';

import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // def

const persistConfig = {
  key: 'root',
  storage,
};

const reducer = {
  main: mainReducer,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers(reducer)
);

const preloadedState = {};

const epicMiddleware = createEpicMiddleware();

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const middlewares: any[] = [
      ...getDefaultMiddleware({
        serializableCheck: {
          // Ignore these action types
          ignoredActions: ['persist/PERSIST'],
          // Ignore these field paths in all actions
          ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
          // Ignore these paths in the state
          ignoredPaths: ['items.dates'],
        },
      }),
    ];
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { logger } = require('redux-logger');
      middlewares.push(logger);
    }
    return middlewares;
  },
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState,
  enhancers: [applyMiddleware(epicMiddleware)],
});
epicMiddleware.run(rootEpic);

// The store has been created with these options:
// - The slice reducers were automatically passed to combineReducers()
// - redux-thunk and redux-logger were added as middleware
// - The Redux DevTools Extension is disabled for production
// - The middleware, batched subscribe, and devtools enhancers were composed together
export default store;
export { store };
export const persistor = persistStore(store);
