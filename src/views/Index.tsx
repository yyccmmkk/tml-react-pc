import React from 'react';
import { withRouter } from '../router/withRouter';
import { Navigate, useSearchParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from '../redux/slices';
import http from '../http.service';
//import { message } from 'antd';

const win: any = window;

export class Home extends React.Component {
  props: any;
  state: any;

  constructor(props: any) {
    super(props);
    this.state = {
      isRedirect: false,
      isIllegal: false,
    };
  }

  componentDidMount() {
    const params: any = new URLSearchParams(this.props.location.search);
    const code = params.get('code');

    if (code) {
      sessionStorage.setItem('token', code);
      this.props.updateCode(code);
      this.setState({
        isRedirect: true,
      });
    }
  }

  render() {
    const { isRedirect, isIllegal } = this.state;
    return (
      <div>
        {isRedirect && <Navigate to="/index" />}
        {isIllegal && <Navigate to="/illegal" />}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      updateToken: actions.updateToken,
      updateCode: actions.updateCode,
      asyncActionType: actions.asyncActionType,
    },
    dispatch
  );
const container = withRouter(connect(null, mapDispatchToProps)(Home));

export { container };
