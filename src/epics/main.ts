import { of, interval, take, timer } from 'rxjs';
import {
  mergeMap,
  map,
  catchError,
  finalize,
  raceWith,
  concatWith,
} from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { _http } from '../http.service';
import { message } from '../utils';

import { actions } from '../redux/slices';

const { updateAsyncData, updateErrInfo, asyncActionType } = actions;

export const demoEpic = (action$: any, state$: any) =>
  action$.pipe(
    ofType(asyncActionType),
    mergeMap((action: any) => {
      const { token } = state$.value.main;
      return _http
        .post('/async/action', {
          actionPayload: action.payload,
          token,
        })
        .pipe(
          map(({ response: { code, msg, data } }: any) => {
            if (code !== 0) {
              throw Error(msg);
            }
            return updateAsyncData(['async result ']);
          }),
          catchError(({ message: err }: any) => {
            message.error(err);
            return of(updateErrInfo(err));
          })
        );
    }),
    catchError(({ message: err }: any) => {
      message.error(err);
      return of(updateErrInfo(err));
    })
  );
