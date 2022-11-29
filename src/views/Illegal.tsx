import React from 'react';
import http from '../http.service';

export class Illegal extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  props: any;
  state: any;

  render() {
    return (
      <div
        className="Illegal"
        style={{
          backgroundColor: 'red',
          color: '#fff',
          minHeight: '100vh',
          padding: '1px 0',
        }}
      >
        <h1 style={{ textAlign: 'center', marginTop: 250 }}>禁止非法访问!</h1>
        <h1 style={{ textAlign: 'center', marginTop: 20 }}>
          请使用企业微信访问！
        </h1>
        <h1 style={{ textAlign: 'center', marginTop: 20 }}>
          如有疑问请联系管理员！
        </h1>
      </div>
    );
  }
}
