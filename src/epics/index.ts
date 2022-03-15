import { combineEpics } from 'redux-observable';
import { catchError } from 'rxjs/operators';
import {
  demoEpic
} from './main';

export const rootEpic = (action$:any, store$:any, dependencies:any) =>
  combineEpics(demoEpic)(action$, store$, dependencies).pipe(
    catchError((error, source) => {
      console.error(error);
      return source;
    })
  );
