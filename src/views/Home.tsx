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

  getInfo() {
    let { code } = this.props.code;
    code = code || sessionStorage.getItem('token');
    http
      .get(`/tangCarController/getRQCode?meetingId=${code}`)
      .then(({ data: rs }: any) => {
        const { code, msg, data } = rs;
        if (code !== 200) {
          message.error(msg);
          return;
        }
        const {
          base64,
          startDateTime,
          systemCurrentTimeMillis,
          title,
          meetingPerson,
          content: subject,
          meetingPlace: addr,
          announcements,
        } = data;
        this.setState({
          base64: `data:image/gif;base64,${base64}`,
          startDateTime,
          curTime: systemCurrentTimeMillis,
        });
        this.props.updateMeetingInfo({
          title,
          subject,
          participants: meetingPerson,
          attention: announcements,
          addr,
        });
      });
  }

  componentDidMount(): void {
    this.getInfo();
  }

  render() {
    const { title } = this.state;
    return (
      <div className="Home">
        <h1>home</h1>
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
