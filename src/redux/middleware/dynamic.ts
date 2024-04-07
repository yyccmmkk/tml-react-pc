import { createDynamicMiddleware } from '@reduxjs/toolkit/react';
export const dynamicMiddleware = createDynamicMiddleware();

const {
  middleware,
  addMiddleware,
  withMiddleware,
  createDispatchWithMiddlewareHook,
} = dynamicMiddleware;

interface MiddlewareApiConfig {
  state: any;
  dispatch: any;
}

export const addAppMiddleware = addMiddleware.withTypes<MiddlewareApiConfig>();

export const withAppMiddleware =
  withMiddleware.withTypes<MiddlewareApiConfig>();

export const createAppDispatchWithMiddlewareHook =
  createDispatchWithMiddlewareHook.withTypes<MiddlewareApiConfig>();

export default middleware;
