import {BrowserRouter, HashRouter} from 'react-router-dom';

const Router: any = (process.env.API_ENV === 'production' || process.env.API_ENV === 'pre') ? HashRouter : BrowserRouter;
export {Router};
