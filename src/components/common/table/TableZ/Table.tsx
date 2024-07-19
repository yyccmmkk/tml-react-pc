import React, { type ReactNode, useCallback, useEffect, useState } from 'react';
import { Divider } from 'antd';
import styles from '@c/common/table/styles/tableZ.module.scss';
import { SearchHeader } from '@c/common/table/TableZ/SearchCondition';
import { type TableZType, Params, type FetchZ } from './type';
import { TabTable } from './TabTable';
import TableItem from './TableItem';

export default function TableZ(props: TableZType) {
  const {
    tableProps = {
      pagination: {},
      fetchData: () => Promise.resolve(),
    },
    tableList = [],
    tabsProps = {},
    searchProps = { list: [] },
  } = props;

  const [params, setParams] = useState({});

  let handleSearch = (p: any) => Promise.resolve<any>(1);
  useEffect(() => {
    const h = tableList.length ? tableList[0].fetchData : tableProps.fetchData;
    handleSearch = h;
  }, []);

  const handleFinish = useCallback((params: Params) => {
    debugger;
    setParams(params);
    handleSearch(params);
  }, []);

  return (
    <div className={styles.tableZ}>
      <SearchHeader {...searchProps} onFinish={handleFinish} />
      <Divider />
      {tableList.length > 1 ? (
        <TabTable
          setFetchData={(e: FetchZ<any>) => (handleSearch = e)}
          params={params}
          tableList={tableList}
          tabsProps={tabsProps}
        />
      ) : (
        <TableItem params={params} {...tableProps} />
      )}
    </div>
  );
}
