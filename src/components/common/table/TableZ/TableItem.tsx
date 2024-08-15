import React, { useCallback, useEffect, useState } from 'react';
import { Table, TableProps } from 'antd';
import { Item, TableZProps } from '@c/common/table/TableZ/type';

export default function Table1(props: TableZProps) {
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const {
    fetchData,
    params,
    setPage,
    setSize,
    initValues = {},
    ...tableProps
  } = props;
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

  const pagination = {
    hideOnSinglePage: true,
    onChange: useCallback(
      (page: number, pageSize: number) => {
        setLoading(true);
        setPage && setPage(page);
        fetchData({ ...params, pageNum: page, pageSize: pageSize })?.finally(
          () => {
            setLoading(false);
          }
        );
      },
      [params]
    ),
    onShowSizeChange(cur: number, size: number) {
      setPageSize(size);
      setSize && setSize(size);
    },
    pageSize: 10,
    total: 10,
  };

  useEffect(() => {
    setLoading(true);
    fetchData({
      ...initValues,
      ...params,
      pageNum: 1,
      pageSize: (tableProps.pagination && tableProps.pagination.pageSize) || 10,
    }).finally(() => setLoading(false));
  }, []);

  return (
    <Table
      rowSelection={{
        type: 'checkbox',
        ...rowSelection,
      }}
      loading={loading}
      {...tableProps}
      pagination={{ ...pagination, ...tableProps.pagination, pageSize }}
    />
  );
}
