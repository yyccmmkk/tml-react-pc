import React, {
  type ReactNode,
  useCallback,
  useEffect,
  useState,
  forwardRef,
} from 'react';
import { Divider } from 'antd';
import styles from '@c/common/table/styles/tableZ.module.scss';
import { QueryCondition as SearchHeader } from '@c/common/table/TableZ/QueryCondition';
import { type TableZType, Params, type FetchZ } from './type';
import { TabTable } from './TabTable';
import TableItem from './TableItem';

export default forwardRef(function TableZ(props: TableZType, ref: any) {
  const {
    tableProps = {
      pagination: {},
      fetchData: () => Promise.resolve(),
    },
    tableList = [],
    tabsProps = {},
    searchProps = { list: [] },
    children,
    searchNodes,
  } = props;

  const [params, setParams] = useState({});
  //const [page, setPage] = useState(1);
  let page = 1;
  let handleSearch = (p: any) => Promise.resolve<any>(1);

  useEffect(() => {
    const h = tableList.length ? tableList[0].fetchData : tableProps.fetchData;
    handleSearch = h;
  }, []);

  const handleFinish = useCallback((params: Params) => {
    setParams(params);
    setPage(1);
    handleSearch({ ...params, pageNum: page });
  }, []);

  const setPage = (e: number) => {
    page = e;
    ref?.current.setPage(e);
  };
  const setSize = (size: number) => {
    ref?.current.setPageSize(size);
  };

  return (
    <div className={styles.tableZ}>
      <SearchHeader ref={ref} {...searchProps} onFinish={handleFinish} />
      <Divider />
      {children}
      {tableList.length > 1 ? (
        <TabTable
          setFetchData={(e: FetchZ<any>) => (handleSearch = e)}
          params={params}
          tableList={tableList}
          tabsProps={tabsProps}
        />
      ) : (
        <TableItem
          setSize={setSize}
          setPage={setPage}
          params={params}
          {...tableProps}
        />
      )}
    </div>
  );
});
