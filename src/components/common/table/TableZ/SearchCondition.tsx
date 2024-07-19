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
import React, { useCallback, useId, useState } from 'react';
import { SearchProps, type QueryEle } from './type';

const { RangePicker } = DatePicker;

const count = 1;

export type SearchPropsType = SearchProps;
export function SearchHeader(props: SearchProps) {
  const {
    onFinish = console.log,
    initialValues,
    searchBtnText = '搜索',
    handleReset,
    resetBtnText = '重置',
    list = [],
    btnNodes,
  } = props;

  const [params, setParams] = useState({});
  const BtnList = [btnNodes]
    .flat()
    .filter((v) => v)
    .map((Vv: any) =>
      Vv.node ? (
        Vv?.node
      ) : (
        <Button
          key={useId()}
          onClick={useCallback(() => Vv!.handleClick(params), [params])}
        >
          {Vv.text}
        </Button>
      )
    );

  const handleFinish = (e: any) => {
    setParams(e);
    onFinish();
  };

  return (
    <Form
      name={useId()}
      layout="inline"
      onFinish={handleFinish}
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
                style={{ minWidth: 120 }}
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
          <Form.Item key={useId()} name={name} label={label}>
            {node ? node : ele}
          </Form.Item>
        );
      })}

      <Form.Item>
        <Button style={{ marginRight: 15 }} type="primary" htmlType="submit">
          {searchBtnText}
        </Button>
        <Button htmlType="reset" onClick={handleReset}>
          {resetBtnText}
        </Button>
        <>{btnNodes && BtnList}</>
      </Form.Item>
    </Form>
  );
}
