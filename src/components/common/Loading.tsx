/*
* Created by yyccmmkk on 2019/12/5 11:28
* 36995800@163.com
*/
import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

import './Loading.css'

const antIcon = <LoadingOutlined style={{ fontSize: 100 }} spin />;

export class Loading extends React.Component {
    props: any;

    render() {
        const {isLoading} = this.props;
        return (
            isLoading ?
                <div className='loading'>
                    <Spin indicator={antIcon} />
                    <span className={'text'}>加载中...</span>
                </div>
                : null
        )
    }
}
