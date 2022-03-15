import { configureStore } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from '../epics';
import { applyMiddleware, compose } from 'redux';
import mainReducer from './slices';

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const epicMiddleware = createEpicMiddleware();

// We'll use redux-logger just as an example of adding another middleware
// import logger from 'redux-logger';

// And use redux-batch as an example of adding enhancers
// import { reduxBatch } from '@manaflair/redux-batch';

const reducer = {
  main: mainReducer

};

const preloadedState = {
  main: { b: 4 }
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => {
    const middlewares: any[] = [...getDefaultMiddleware()];
    if (process.env.NODE_ENV === 'development') {
      const { logger } = require('redux-logger');
      middlewares.push(logger);
    }
    return middlewares;
  },
  devTools: process.env.NODE_ENV !== 'production',
  // preloadedState, // 会覆盖 reducer initialState
  enhancers: [applyMiddleware(epicMiddleware)] // [reduxBatch],
});

epicMiddleware.run(rootEpic);

export { store };
// The store has been created with these options:
// - The slice reducers were automatically passed to combineReducers()
// - redux-thunk and redux-logger were added as middleware
// - The Redux DevTools Extension is disabled for production
// - The middleware, batch, and devtools enhancers were composed together
