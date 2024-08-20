import { Navigate } from 'react-router-dom';
import React from 'react';
import App from '../App';
import { container as Index } from '../views/Index';
import { Illegal } from '@/views/Illegal';
import EmptyPage from '@/views/Empty';
import { container as Home } from '@/views/Home';
import { container as ErrorBoundary } from '@/views/ErrorBoundary';
import { AddListener } from '@/views/demo/AddListener';
import HookComponent from '@/views/demo/HookComponent';
import { container as HookContainer } from '@/views/demo/HookContainer';
import { TableTest } from '@/views/demo/TableTest';
// @ts-ignore
import FourZeroFour from '@/views/FourZeroFour';

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
        path: 'home',
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
      {
        path: '404',
        element: <FourZeroFour />,
        handle: { title: '404' },
      },
      {
        path: 'demo',
        element: null,
        children: [
          {
            path: 'table',
            element: <TableTest />,
          },
          {
            path: 'al',
            element: <AddListener />,
          },
          {
            path: 'hc',
            element: <HookComponent />,
          },
          {
            path: 'hc/:id',
            element: <HookContainer />,
          },
        ],
      },
    ].map((v) => ({ ...v, errorElement: <ErrorBoundary /> })),
  },
  {
    path: '/index',
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
