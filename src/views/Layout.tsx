import React from 'react';
import http from '@/http.service';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions } from '@x/slices';
import { withRouter } from '@r/withRouter';
import { Navigate, Outlet } from 'react-router-dom';

const isDo = false;

export class Layout extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      isRedirect: false,
    };
  }

  props: any;
  state: any;

  componentDidMount(): void {
    //
  }

  render() {
    const { isRedirect } = this.state;
    return (
      <div>
        <Outlet />
        {isRedirect ? <Navigate to="/illegal" replace={true} /> : ''}
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  const {
    main: { token },
  } = state;
  return {
    token,
  };
};

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      updateToken: actions.updateToken,
      asyncActionType: actions.asyncActionType,
    },
    dispatch
  );

const container = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Layout)
);

export { container };
