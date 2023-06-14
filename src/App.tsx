import React from 'react';
import './App.css';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';

import { container as Layout } from './views/Layout';
import {
  legacyLogicalPropertiesTransformer,
  StyleProvider,
} from '@ant-design/cssinjs';


function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <StyleProvider hashPriority={'high'} transformers={[legacyLogicalPropertiesTransformer]}>
      <div className="App">
        <Layout />
      </div>
      </StyleProvider>
    </ConfigProvider>
  );
}

export default App;
