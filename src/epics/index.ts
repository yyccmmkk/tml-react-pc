import { combineEpics } from 'redux-observable';
import { catchError } from 'rxjs/operators';
import { epics as main } from './main';

export const rootEpic = (action$: any, store$: any, dependencies: any) =>
  combineEpics(...main)(action$, store$, dependencies).pipe(
    catchError((error, source) => {
      console.error(error);
      return source;
    })
  );
