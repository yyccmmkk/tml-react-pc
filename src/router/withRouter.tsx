import React from 'react';
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
export function withRouter(Component: any) {
  function ComponentWithRouterProp(props: any) {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    return (
      <Component
        {...props}
        {...{ location, navigate, params, searchParams, setSearchParams }}
      />
    );
  }

  return ComponentWithRouterProp;
}
