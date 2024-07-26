import React, {
  useState,
  useEffect,
  memo,
  useCallback,
  type ReactNode,
} from 'react';
import http from '@/http.service';
import {
  Button,
  Form,
  Input,
  Select,
  Flex,
  Tabs,
  DatePicker,
  Table,
  Divider,
} from 'antd';
import styles from './styles/tableZ.module.scss';
import type { TableProps, TabsProps, FormProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { defaultsDeep } from 'lodash-es';

const { RangePicker } = DatePicker;
let count = 1;
interface Item {
  [props: string]: number | string | undefined;
  key: string | number;
}

interface Params {
  [props: string]: number | string | undefined;
}
interface TabZProps extends TabsProps {
  handleTabChange?: (p: string) => void;
}

interface TableZ {
  tabsProps?: TabZProps;
  tableList?: TableZProps[];
  tableProps?: TableZProps;
  searchProps?: SearchProps;
}

interface TableZProps extends TableProps {
  firstPage?: 0 | 1;
  tabTitle?: string;
  fetchData: (p: any) => Promise<any>;
}

interface SearchProps extends FormProps {
  searchBtnText?: string;
  resetBtnText?: string;
  btnNodes?: ReactNode;
  handleReset?: () => void;
}

const SearchHeader = function SearchHeader(props: SearchProps) {
  const {
    onFinish = console.log,
    initialValues,
    searchBtnText = '搜索',
    handleReset,
    resetBtnText = '重置',
  } = props;

  return (
    <Form
      name={'customized_form_controls' + count++}
      layout="inline"
      onFinish={onFinish}
      initialValues={initialValues}
    >
      <Form.Item name="price" label="Price">
        <Input />
      </Form.Item>
      <Form.Item name="demo" label="demo">
        <Select style={{ width: 200 }}>
          <Select.Option value="demo">Demo</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="DatePicker" name="DatePicker">
        <DatePicker />
      </Form.Item>

      <Form.Item label="RangePicker" name="RangePicker">
        <RangePicker />
      </Form.Item>

      <Form.Item>
        <Button style={{ marginRight: 15 }} type="primary" htmlType="submit">
          {searchBtnText}
        </Button>
        <Button htmlType="reset" onClick={handleReset}>
          {resetBtnText}
        </Button>
      </Form.Item>
    </Form>
  );
};

interface FetchMap {
  [props: string]: {
    loading: boolean;
    isNeedInit?: boolean;
  };
}
export default function TableZ(props: TableZ) {
  const {
    tableProps = {
      pagination: {},
      fetchData: Promise.resolve,
    },
    tableList = [],
    tabsProps = {},
    searchProps = {},
  } = props;

  const [tabItems, setTabItems] = useState<TabsProps['items']>([]);
  //const [index, setIndex] = useState('1');
  const [fetchMap, setFetchMap] = useState<FetchMap>({});
  const [loading, setLoading] = useState(false);

  let handleSearch: (p: any) => Promise<void> | void = () => Promise.resolve();
  let firstPage: 0 | 1 = 1;
  let index = '1';

  function setFm(key: string | number, value = false) {
    setFetchMap({ ...fetchMap, [key]: { loading: value } });
  }
  const onFinish = useCallback((params: Params) => {
    console.log(index, 9999);
    setFm(index, true);
    handleSearch({ ...params, page: firstPage })?.finally(() => setFm(index));
  }, []);

  const pagination = {
    hideOnSinglePage: true,
    onChange: useCallback((page: number, pageSize: number) => {
      setFm(index, true);
      setLoading(true);
      handleSearch({ page })?.finally(() => {
        setFm(index);
        setLoading(false);
      });
    }, []),
    pageSize: 20,
    total: 20,
  };

  const onTabChange = useCallback(
    (activeKey: string) => {
      //setIndex(activeKey);
      index = activeKey;
      const { firstPage: fp, fetchData } = tableList[+activeKey - 1];
      firstPage = typeof fp === 'undefined' ? 1 : fp;
      handleSearch = fetchData;
    },
    [index]
  );

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: Item[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows
      );
    },
    getCheckboxProps: (record: Item) => ({
      disabled: record.name === 'disabled', // Column parameterConfiguration not to be checked
      name: 'name',
    }),
  };

  //let fetchMap:FetchMap = {};

  useEffect(() => {
    console.log(index, 7474747);
    debugger;
    if (!tableList.length) {
      handleSearch = tableProps.fetchData;
    } else {
      const temp = tableList.reduce((acc, cur, i: number) => {
        cur?.fetchData({ page: 1 }).finally(() => setFm(i + 1));
        return { ...acc, [i + 1]: { loading: false, isNeedInit: true } };
      }, {});
      setFetchMap(temp);
    }
    setFetchMap({ ...fetchMap, [1]: { loading: true } });
  }, []);

  useEffect(() => {
    console.log(tableList, 67890);
    if (tableList.length > 1) {
      debugger;
      setTabItems(
        tableList.map((v, i: number) => {
          const { firstPage, tabTitle, fetchData, ...tableProps } = v;

          return {
            key: `${i + 1}`,
            label: v.tabTitle || '',
            children: (
              <Table
                rowSelection={{
                  type: 'checkbox',
                  ...rowSelection,
                }}
                loading={fetchMap[i + 1]?.loading}
                {...tableProps}
                pagination={{ ...pagination, ...tableProps.pagination }}
              />
            ),
          };
        })
      );
      handleSearch = tableList[0].fetchData;
      index = '1';
    }
  }, [fetchMap, tableList]);

  useEffect(() => {
    debugger;
    if (!tableList.length) {
      setLoading(true);
      handleSearch({ page: 1 })?.finally(() => setLoading(false));
    }
  }, []);

  return (
    <div className={styles.tableZ}>
      <SearchHeader {...searchProps} onFinish={onFinish} />
      <Divider />
      {tableList.length > 1 ? (
        <Tabs
          defaultActiveKey="1"
          {...tabsProps}
          items={tabItems}
          onChange={onTabChange}
        />
      ) : (
        <Table
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
          loading={loading}
          {...tableProps}
          pagination={{ ...pagination, ...tableProps.pagination }}
        />
      )}
    </div>
  );
}
