import React from 'react';
import '@x/middleware/listener';
import { store } from '@/redux';
import { actions } from '@s/index';
export class AddListener extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  props: any;
  state: any;

  componentDidMount(): void {
    // todo
    setTimeout(() => {
      store.dispatch(actions.asyncActionType());
    }, 3000);
  }

  render() {
    const { props } = this.props;
    const { state } = this.state;
    return (
      <div className="AddListener">
        <h1>AddListener</h1>
      </div>
    );
  }
}
