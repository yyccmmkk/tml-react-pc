import React from 'react';
import { Button, Result } from 'antd';
import { bindActionCreators } from 'redux';
import { actions } from '@s/index';
import { withRouter } from '@r/withRouter';
import { connect } from 'react-redux';

export class ErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  props: any;
  state: any;

  componentDidMount(): void {
    // todo
  }

  render() {
    const { props } = this.props;
    const { state } = this.state;
    return (
      <div className="ErrorBoundary">
        <Result
          status="500"
          title="发生意外错误"
          subTitle="Sorry, something went wrong."
          extra={
            <Button type="primary" onClick={() => this.props.navigate('/')}>
              返回首页
            </Button>
          }
        />
      </div>
    );
  }
}
const mapStateToProps = (state: any) => {
  const {
    main: { code },
  } = state;
  return {
    code,
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
  connect(mapStateToProps, mapDispatchToProps)(ErrorBoundary)
);

export { container };
