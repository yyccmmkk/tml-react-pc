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
    http.get('/api/xxx').then(({ data: rs }: any) => {
      const { code, msg, data } = rs;
      if (code !== 200) {
        message.error(msg);
        return;
      }
      // do...
    });
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
          @emotion/styled222
        </h1>
        <div>hooks style 组件demo: http://localhost:3000/demo/hc</div>
        <div>hooks style container demo: http://localhost:3000/demo/hc/111</div>
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
