import React from 'react';
import './App.less';
import { ConfigProvider } from 'antd';
import { Router } from './components/common/Router';
import { Routes, Route } from 'react-router-dom';

// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { container as Home } from './components/Home';

moment.locale('zh-cn');

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/index/:token" element={<Home />}></Route>
            <Route
              path="*"
              element={
                <main style={{ padding: '1rem' }}>
                  <p>There's nothing here!</p>
                </main>
              }
            />
          </Routes>
        </Router>
      </div>
    </ConfigProvider>
  );
}

export default App;
