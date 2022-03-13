import React from 'react';
import logo from './logo.svg';
import './App.less';
import {ConfigProvider, Button, DatePicker } from 'antd';

// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');


function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <div className="App">
        <DatePicker />
        <Button type="primary">Button</Button>
      </div>
    </ConfigProvider>
  );
}

export default App;
