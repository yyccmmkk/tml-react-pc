import React from 'react';
import './App.css';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';

import { container as Layout } from './views/Layout';

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <div className="App">
        <Layout />
      </div>
    </ConfigProvider>
  );
}

export default App;
