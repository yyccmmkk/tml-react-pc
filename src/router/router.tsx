import { Navigate } from 'react-router-dom';
import React from 'react';
import App from '../App';
import { container as Index } from '../views/Index';
import { Illegal } from '../views/Illegal';
import EmptyPage from '../views/Empty';
import { container as Home } from '../views/Home';

export const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Navigate to="/home" />,
      },
      {
        path: 'index',
        element: <Home />,
      },
      {
        path: 'empty',
        element: <EmptyPage />,
      },
      {
        path: 'illegal',
        element: <Illegal />,
      },
    ],
  },
  {
    path: '/home',
    element: <Index />,
  },
  {
    path: '*',
    element: (
      <main style={{ padding: '1rem' }}>
        <p>There&apos;s nothing here!</p>
      </main>
    ),
  },
];
