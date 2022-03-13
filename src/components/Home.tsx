
import React from "react";
import http from "../http.service";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actions } from "../redux/actions";

import {Button, DatePicker} from "antd";


export class Home extends React.Component {
  props: any;

  unsubscribe: any[] = [];

  componentDidMount(): void {

  }

  render() {

    return (
      <div>
        <DatePicker/>
        <div>token::{this.props.token}</div>
        <Button type="primary" onClick={()=>this.props.updateToken('12345')}>Button</Button>
        <Button type="primary" onClick={()=>this.props.asyncActionType('async action payload')}>async action</Button>

      </div>);
  }
}
const mapStateToProps = (state: any) => {
  const {
    main: {
      token
    },
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

const container = connect(mapStateToProps, mapDispatchToProps)(Home);

export { container };
