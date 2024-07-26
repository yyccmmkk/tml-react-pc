import React from 'react';
import http from '@/http.service';
import {
  Button,
  DatePicker,
  Form,
  FormProps,
  Cascader,
  Input,
  Select,
  TimePicker,
  Switch,
  TreeSelect,
} from 'antd';
import { FormInstance } from 'antd/es/form';

import { SearchProps, type QueryEle } from './type';

const { RangePicker } = DatePicker;

let count = 1;

export type SearchPropsType = SearchProps;

export class QueryCondition extends React.Component {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      params: {},
      page: 1,
      pageSize: 10,
    };
    this.handleFinish = this.handleFinish.bind(this);
  }

  props: any;
  state: any;
  refEle = React.createRef<FormInstance>();

  setPageSize(e: number) {
    this.setState({ pageSize: e });
  }
  setPage(page: number) {
    this.setState({ page });
  }
  getParams(type: 1 | 2 = 1) {
    const { page, pageSize } = this.state;
    const temp =
      type === 1 ? this.state.params : this.refEle.current?.getFieldsValue();
    return { ...temp, pageNum: page, pageSize };
  }

  handleFinish(e: any) {
    const { pageSize, page: pageNum } = this.state;
    debugger;
    this.setState({ params: e });
    this.props.onFinish({ ...e, pageSize, pageNum });
  }

  componentDidMount(): void {
    // todo
  }

  render() {
    const {
      onFinish = console.log,
      initialValues,
      searchBtnText = '搜索',
      handleReset,
      resetBtnText = '重置',
      list = [],
      btnNodes,
    } = this.props;
    const { params } = this.state;
    return (
      <Form
        ref={this.refEle}
        name={`id_${count++}`}
        layout="inline"
        onFinish={this.handleFinish}
        initialValues={initialValues}
      >
        {list.map((v: QueryEle) => {
          const {
            type,
            options = [],
            node,
            eleProps = {},
            name,
            label,
            treeData = [],
            width = 120,
          } = v;
          let ele = null;
          switch (type) {
            case 'Input':
              ele = <Input placeholder="请输入" {...eleProps} />;
              break;
            case 'Select':
              ele = (
                <Select
                  placeholder="请选择"
                  style={{ width: width }}
                  options={options}
                  {...eleProps}
                />
              );
              break;
            case 'DatePicker':
              ele = <DatePicker placeholder="请选择" {...eleProps} />;
              break;
            case 'RangePicker':
              ele = <RangePicker {...eleProps} />;
              break;
            case 'TimePicker':
              ele = <TimePicker {...eleProps} />;
              break;
            case 'TimeRangePicker':
              ele = <TimePicker.RangePicker {...eleProps} />;
              break;
            case 'Switch':
              ele = <Switch {...eleProps} />;
              break;
            case 'TreeSelect':
              ele = <TreeSelect treeData={treeData} {...eleProps} />;
              break;
            case 'Cascader':
              ele = <Cascader options={options} {...eleProps} />;
              break;
            default:
              ele = <Input placeholder="请选择" {...eleProps} />;
          }
          return (
            <Form.Item key={count++} name={name} label={label}>
              {node ? node : ele}
            </Form.Item>
          );
        })}

        <Form.Item style={{ marginLeft: 55 }}>
          <Button style={{ marginRight: 15 }} type="primary" htmlType="submit">
            {searchBtnText}
          </Button>
          <Button htmlType="reset" onClick={handleReset}>
            {resetBtnText}
          </Button>
          <>
            {btnNodes &&
              [btnNodes]
                .flat()
                .filter((v) => v)
                .map((Vv: any) =>
                  Vv.node ? (
                    Vv?.node
                  ) : (
                    <Button
                      key={count++}
                      onClick={() => Vv!.handleClick(params)}
                    >
                      {Vv.text}
                    </Button>
                  )
                )}
          </>
        </Form.Item>
      </Form>
    );
  }
}
