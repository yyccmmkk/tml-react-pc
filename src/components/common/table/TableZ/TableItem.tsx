import React, { useCallback, useEffect, useState } from 'react';
import { Table, TableProps } from 'antd';
import { Item, TableZProps } from '@c/common/table/TableZ/type';

export default function Table1(props: TableZProps) {
  const [loading, setLoading] = useState(false);
  const { fetchData, params, ...tableProps } = props;

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: Item[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows
      );
    },
    getCheckboxProps: (record: Item) => ({
      disabled: record.name === 'disabled', // Column configuration not to be checked
      name: 'name',
    }),
  };

  const pagination = {
    hideOnSinglePage: true,
    onChange: useCallback((page: number, pageSize: number) => {
      setLoading(true);
      fetchData({ ...params, page })?.finally(() => {
        setLoading(false);
      });
    }, []),
    pageSize: 20,
    total: 20,
  };

  useEffect(() => {
    setLoading(true);
    fetchData({ ...params, page: 1 }).finally(() => setLoading(false));
  }, []);

  return (
    <Table
      rowSelection={{
        type: 'checkbox',
        ...rowSelection,
      }}
      loading={loading}
      {...tableProps}
      pagination={{ ...pagination, ...tableProps.pagination }}
    />
  );
}
