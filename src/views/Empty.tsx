import React from 'react';
import { withRouter } from '@r/withRouter';

export class EmptyPage extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {};
    this.handleBack = this.handleBack.bind(this);
  }

  props: any;
  state: any;

  componentDidMount(): void {
    console.log('Empty mount');
  }

  handleBack() {
    this.props.navigate('/home');
  }

  render() {
    return <div className="Empty">页面开发中...</div>;
  }
}

export default withRouter(EmptyPage);
