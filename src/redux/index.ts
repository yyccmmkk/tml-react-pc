import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import mainReducer from './slices';
import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import { applyMiddleware, combineReducers } from 'redux';
import { rootEpic } from '@/epics';
import { createEpicMiddleware } from 'redux-observable';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // def
import { actions } from '@s/index';
import http from '@/http.service';
import { dynamicMiddleware } from './middleware/dynamic';

// Create the middleware instance and methods
const listenerMiddleware = createListenerMiddleware();

// Add one or more listener entries that look for specific actions.
// They may contain any sync or async logic, similar to thunks.
listenerMiddleware.startListening({
  actionCreator: actions.asyncActionType,
  /*predicate: (action, currentState, previousState) => {
    // Trigger logic whenever this field changes
    return currentState.counter.value !== previousState.counter.value
  },*/
  effect: async (action, listenerApi) => {
    // Run whatever additional side-effect-y logic you want here
    console.log('Todo added: ', action);
    // Can cancel other running instances
    // listenerApi.cancelActiveListeners()
    // Run async logic
    const data = http.get('/api/ttt');

    // Pause until action dispatched or state changed
    // eslint-disable-next-line no-constant-condition
    const result = await listenerApi.condition((action, state: any) => {
      return false;
    }, 5000);
    if (result) {
      // Use the listener API methods to dispatch, get state,
      // unsubscribe the listener, start child tasks, and more
      // Spawn "child tasks" that can do more work and return results
      const task = listenerApi.fork(async (forkApi) => {
        // Can pause execution
        await forkApi.delay(5);
        // Complete the child by returning a value
        return 42;
      });

      const result = await task.result;
      // Unwrap the child result in the listener
      if (result.status === 'ok') {
        // Logs the `42` result value that was returned
        //
        console.log('Child succeeded: ', result.value);
      }
    }
    console.log(9999999);
  },
});

const persistConfig = {
  key: process.env.REACT_APP_PERSIST_KEY || 'root',
  storage,
};

const reducer = {
  main: mainReducer,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers(reducer)
);

const preloadedState: any = {};

const epicMiddleware = createEpicMiddleware();

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware): any => {
    const middlewares: any[] = [
      dynamicMiddleware.middleware,
      listenerMiddleware.middleware,
      ...getDefaultMiddleware({
        serializableCheck: {
          // Ignore these action types
          ignoredActions: ['persist/PERSIST', 'listenerMiddleware/add'],
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
  enhancers: (getDefaultEnhancers) =>
    getDefaultEnhancers().concat([applyMiddleware(epicMiddleware)]),
});
const epic$ = new BehaviorSubject(rootEpic);
// Every time a new epic is given to epic$ it
// will unsubscribe from the previous one then
// call and subscribe to the new one because of
// how switchMap works

const hotReloadingEpic = (...args: any[]) =>
  epic$.pipe(
    // @ts-ignore
    switchMap((epic) => epic(...args))
  );

epicMiddleware.run(hotReloadingEpic);
// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept('@/epics', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const nextRootEpic = require('@/epics').rootEpic;
    epic$.next(nextRootEpic);
  });
}

//
// The store has been created with these options:
// - The slice reducers were automatically passed to combineReducers()
// - redux-thunk and redux-logger were added as middleware
// - The Redux DevTools Extension is disabled for production
// - The middleware, batched subscribe, and devtools enhancers were composed together
export default store;
export { store };
export const persistor = persistStore(store);
