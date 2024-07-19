import React, { JSX } from 'react';
import http from '@/http.service';
import TableZ from '@c/common/table/TableZ/Table';
import { message } from '@u/index';
import { QueryEle } from '@/components/common/table/TableZ/type';
import { Button } from 'antd';

let count = 1;

export class TableTest extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      datasource1: [],
      datasource2: [],
      datasource3: [],
      total1: 20,
      total2: 20,
      total3: 20,
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.fetchList1 = this.fetchList1.bind(this);
    this.fetchList2 = this.fetchList2.bind(this);
    this.fetchList3 = this.fetchList3.bind(this);
  }

  props: any;
  state: any;

  handleSearch(params: any) {
    console.log(params, 87888);
  }
  componentDidMount(): void {
    // todo
  }
  adaptor(list: any[]) {
    return list.map((v) => ({ key: count++, ...v }));
  }
  fetchList1(params: any) {
    return http.get('/api/list1', { params }).then(({ data: rs }: any) => {
      const { code, msg, data } = rs;
      if (code !== 200) {
        message.error(msg);
        return;
      }
      const { total, list } = data;
      this.setState({
        datasource1: this.adaptor(list),
        total1: total,
      });
    });
  }

  fetchList2(params: any) {
    return http.get('/api/list2', { params }).then(({ data: rs }: any) => {
      const { code, msg, data } = rs;
      if (code !== 200) {
        message.error(msg);
        return;
      }
      const { total, list } = data;
      this.setState({
        datasource2: this.adaptor(list),
        total2: total,
      });
    });
  }
  fetchList3(params: any) {
    return http.get('/api/list3', { params }).then(({ data: rs }: any) => {
      const { code, msg, data } = rs;
      if (code !== 200) {
        message.error(msg);
        return;
      }
      const { total, list } = data;
      this.setState({
        datasource3: this.adaptor(list),
        total3: total,
      });
    });
  }

  queryCodition: QueryEle[] = [
    {
      type: 'Input',
      name: 'name',
      label: '录入条件1',
    },
    {
      type: 'Select',
      name: 'select',
      label: '选择条件2',
      options: [
        {
          label: '下拉1',
          value: 0,
        },
        {
          label: '下拉2',
          value: 1,
        },
      ],
    },
    {
      type: 'DatePicker',
      name: 'datePicker',
      label: '日期选择',
    },
    {
      type: 'RangePicker',
      name: 'rangePicker',
      label: '日期范围选择',
    },
    {
      type: 'TimePicker',
      name: 'timePicker',
      label: '时间选择',
    },
    {
      type: 'TimeRangePicker',
      name: 'timeRangePicker',
      label: '时间范围选择',
    },
  ];

  render() {
    const { props } = this.props;
    const { datasource1, datasource2, datasource3, total1, total2, total3 } =
      this.state;
    return (
      <div className="TableTest">
        <TableZ
          searchProps={{
            list: this.queryCodition,
            btnNodes: {
              node: (
                <Button key={count++} onClick={console.log}>
                  导出
                </Button>
              ),
              handleClick: console.log,
            },
          }}
          tableList={[
            {
              pagination: { total: total1 },
              dataSource: datasource1,
              columns: [
                { title: 'a1', dataIndex: 'a' },
                { title: 'b1', dataIndex: 'b' },
                { title: 'c1', dataIndex: 'c' },
              ],
              tabTitle: '测试表格1',
              fetchData: this.fetchList1,
            },
            {
              pagination: { total: total2 },
              dataSource: datasource2,
              columns: [
                { title: 'a2', dataIndex: 'a' },
                { title: 'b2', dataIndex: 'b' },
                { title: 'c2', dataIndex: 'c' },
              ],
              tabTitle: '测试表格2',
              fetchData: this.fetchList2,
            },
          ]}
        />
        <TableZ
          searchProps={{
            list: this.queryCodition,
            btnNodes: [
              { text: '测试按钮', handleClick: console.log, props: Object },
            ],
          }}
          tableProps={{
            pagination: { total: total3 },
            dataSource: datasource3,
            columns: [
              { title: 'a3', dataIndex: 'a' },
              { title: 'b3', dataIndex: 'b' },
              { title: 'c3', dataIndex: 'c' },
            ],
            tabTitle: '测试表格3',
            fetchData: this.fetchList3,
          }}
        />
      </div>
    );
  }
}
