import { css, jsx } from '@emotion/react';
import React from 'react';
import http from '@/http.service';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions } from '@/redux/slices';
import { withRouter } from '@r/withRouter';
import { message } from 'antd';
import './styles/home.css';

export class Home extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      title: '',
    };
  }

  props: any;
  state: any;

  componentDidMount(): void {
    //todo
  }

  render() {
    const { title } = this.state;
    return (
      <div className="Home">
        <h1
          css={css`
            font-size: 24px;
            &:hover {
              color: #f00;
            }
          `}
        >
          home
        </h1>
        <p>支持class 及 hooks 风格</p>
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
  connect(mapStateToProps, mapDispatchToProps)(Home)
);

export { container };
