import { IColumn } from '@/components/Table';
import { ReactNode } from 'react';
import { ColumnsType } from 'antd/lib/table/interface';
import { FormInstance as IFormInstance } from 'rc-field-form/es/interface';

/**
 * 导航栏
 */
interface INavItem {
  name: string;
  value: string;
  path: string;
  icon?: string;
  children?: INavItem[];
}

/**
 * 面包屑
 */
interface ICrumbItem {
  name: string;
  id: string;
  parentId: string;
}
/**
 * 表格、图标列表
 */
interface ITableIconProps {
  dataSource: any[];
  scrollSelector?: string | Element;
  tools?: any[];
  contextMenu?: IContextMenu[] | ((data: any) => IContextMenu[]);
  columns?: IColumn[];
}

/**
 * 文件容器
 */
interface IFileContainerProps {
  dataSource: any[];
  crumbs?: ICrumbItem[];
  canCreateFolder?: boolean;
  type: 'person' | 'group';
  tools?: IToolBar[];
  contextMenu?: IContextMenu[] | ((data: any) => IContextMenu[]);
  onToolbarSuccess?: (data?: void) => void;
  onClickColumn?: (data: any) => void;
  onSelect?: (data: any[]) => void;
  onClickTool?: (data: IToolBar) => void;
  onScrollChange?: (data: any) => void;
  onScroll?: (data: any) => void;
}

/**
 * 右键菜单
 */
interface IContextMenu {
  value: string;
  name: string;
  icon?: ReactNode;
  onClick?: (data: any) => void;
}

/**
 * 工具栏
 */
interface IToolBar {
  name: string;
  icon?: ReactNode;
  type: string;
  onClick?: () => void;
}

/**
 * 文件、文件夹操作接口
 */
interface IOperateProps {
  now?: number;
  id?: string;
  type?: string;
  data?: {
    [key: string]: any;
  };
  onSuccess?: (data?: any) => void;
  onCancel?: () => void;
}

type Result = {
  data: any;
  code: number;
  message: string;
};

type SORT = 'date' | 'size' | 'name';

type ORDER = 'DESC' | 'ASC';

interface IUploadFile extends File {
  id?: string;
  folder?: string;
  process?: number;
  status?: 'waiting' | 'pending' | 'success' | 'error';
}

interface IPage {
  count: number;
  page: number;
  total: number;
}

export {
  IPage,
  IUploadFile,
  INavItem,
  IFileContainerProps,
  ITableIconProps,
  IContextMenu,
  IToolBar,
  IOperateProps,
  IFormInstance,
  ColumnsType,
  SORT,
  ORDER,
  ICrumbItem,
  Result,
};
