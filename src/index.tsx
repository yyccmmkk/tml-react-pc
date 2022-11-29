import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store, persistor } from './redux';
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createHashRouter,
} from 'react-router-dom';

import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';
import 'antd/dist/reset.css';

import 'normalize.css';
import { routes } from './router/router';
import { PersistGate } from 'redux-persist/integration/react';

dayjs.locale('zh-cn');
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

dayjs().format('L LT LLLL');
const router = createBrowserRouter(routes, {
  basename: process.env.REACT_APP_ROUTE_BASE_NAME || '/',
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  /*<React.StrictMode>*/
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <RouterProvider router={router} fallbackElement={<div>loading...</div>} />
    </PersistGate>
  </Provider>
  /*</React.StrictMode>*/
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
