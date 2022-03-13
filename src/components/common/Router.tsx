import {BrowserRouter, HashRouter, useLocation, useNavigate, useParams} from 'react-router-dom';
import React from "react";

const Router: any = (process.env.API_ENV === 'production' || process.env.API_ENV === 'pre') ? HashRouter : BrowserRouter;
export {Router};
export function withRouter(Component:any) {
  return (props:any) => (
    <Component
      {...props}
      params={useParams()}
      location={useLocation()}
      navigate={useNavigate()}
    />
  );
}
