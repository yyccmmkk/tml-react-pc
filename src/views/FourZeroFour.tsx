import React from 'react';
import http from '@/http.service';
import { Button, Result } from 'antd';
import { withRouter } from '@r/withRouter';

export class FourZeroFour extends React.Component {
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
    const { navigate } = this.props;
    const { state } = this.state;
    return (
      <div className="FourZeroFour">
        <Result
          status="404"
          title="404"
          subTitle="抱歉，您访问的页面不存在。"
          extra={
            <Button onClick={() => navigate('/')} type="primary">
              返回首页
            </Button>
          }
        />
      </div>
    );
  }
}
export default withRouter(FourZeroFour);
