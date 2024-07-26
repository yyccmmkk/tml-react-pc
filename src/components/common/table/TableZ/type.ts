import { FormProps, TableProps, TabsProps } from 'antd';
import type { ReactNode } from 'react';

export interface TabZProps extends TabsProps {
  handleTabChange?: (p: string) => void;
}
export type TabZPropsType = TabZProps;

export type OptionType = {
  label: string;
  value: string | number;
  children?: OptionType[];
};

export interface TableZ {
  tabsProps?: TabZProps;
  tableList?: TableZProps[];
  tableProps?: TableZProps;
  searchProps?: SearchProps;
  searchNodes?: ReactNode;
  children?: ReactNode;
  ref?: any;
}
export type TableZType = TableZ;

export type TreeData = {
  title: string;
  value: string;
  children: TreeData[];
};

export type QueryEle = {
  type:
    | 'Cascader'
    | 'TreeSelect'
    | 'Switch'
    | 'Input'
    | 'Select'
    | 'DatePicker'
    | 'RangePicker'
    | 'TimePicker'
    | 'TimeRangePicker';
  options?: OptionType[];
  treeData?: TreeData[];
  eleProps?: { [key: string]: any };
  node?: ReactNode;
  name: string;
  label: string;
  width?: number;
};

type BtnItem = {
  node?: ReactNode;
  text?: string;
  props?: { [key: string]: any };
  handleClick?: (p: any) => void | Promise<any>;
};
export interface SearchProps extends FormProps {
  searchBtnText?: string;
  resetBtnText?: string;
  btnNodes?: BtnItem | BtnItem[];
  handleReset?: () => void;
  list: QueryEle[];
}
export type SearchPropsType = SearchProps;

export interface TableZProps extends TableProps {
  firstPage?: 0 | 1;
  tabTitle?: string;
  fetchData: FetchZ<any>;
  params?: { [key: string]: number | string };
  rowSelection?: { [key: string]: any };
  setPage?: (page: number) => void;
  setSize?: (page: number) => void;
}
export type TableZPropsType = TableZProps;

export interface Item {
  [props: string]: number | string | undefined;
  key: string | number;
}

export interface Params {
  [props: string]: number | string | undefined;
}
export interface FetchMap {
  [props: string]: {
    loading: boolean;
    isNeedInit?: boolean;
  };
}

export type FetchZ<T> = (p: T) => Promise<T>;
