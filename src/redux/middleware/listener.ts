import { store } from '@/redux';
import { addListener } from '@reduxjs/toolkit';
import http from '@/http.service';
import { actions } from '@s/index';

const actionCreator = actions.asyncActionType;

const effect = async (action: any, listenerApi: any) => {
  // Run whatever additional side-effect-y logic you want here
  console.log('Todo added: ', action);
  // Can cancel other running instances
  // listenerApi.cancelActiveListeners()
  // Run async logic
  const data = http.get('/api/ttt');

  // Pause until action dispatched or state changed
  // eslint-disable-next-line no-constant-condition
  const result = await listenerApi.condition((action: any, state: any) => {
    return true;
  }, 5000);
  console.log(result, 'result:::');
  if (result) {
    // Use the listener API methods to dispatch, get state,
    // unsubscribe the listener, start child tasks, and more
    // Spawn "child tasks" that can do more work and return results
    const task = listenerApi.fork(async (forkApi: any) => {
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
  console.log(888888);
};

setTimeout(() => {
  (store as any).dispatch(
    addListener({
      predicate: (action, currentState: any, previousState: any) => {
        // Trigger logic after every action if this condition is true
        return action.type !== 'main/asyncActionType';
      },
      effect,
    })
  );
}, 10);
