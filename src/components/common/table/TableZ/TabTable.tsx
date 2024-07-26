import React, { useCallback, useEffect, useState } from 'react';
import type { TabsProps } from 'antd';
import { Tabs, Table } from 'antd';
import { TableZ } from './type';
import TableItem from './TableItem';

type Tb = Omit<TableZ, 'tableProps' | 'searchProps'>;
interface T extends Tb {
  params?: { [key: string]: number | string };
  setFetchData: (p: any) => void;
}
export function TabTable(props: T) {
  const { tableList = [], tabsProps = {}, setFetchData = console.log } = props;
  const [tabItems, setTabItems] = useState<TabsProps['items']>([]);

  let index = '1';
  const onTabChange = useCallback(
    (activeKey: string) => {
      //setIndex(activeKey);
      index = activeKey;
      const { firstPage: fp, fetchData } = tableList[+activeKey - 1];
      setFetchData(fetchData);
    },
    [index]
  );

  useEffect(() => {
    if (tableList.length > 1) {
      setTabItems(
        tableList.map((v, i: number) => {
          const { firstPage, tabTitle, fetchData, ...tableProps } = v;

          return {
            key: `${i + 1}`,
            label: v.tabTitle || '',
            children: <TableItem {...v} />,
          };
        })
      );
      index = '1';
    }
  }, [tableList]);

  return (
    <Tabs
      defaultActiveKey="1"
      {...tabsProps}
      items={tabItems}
      onChange={onTabChange}
    />
  );
}
