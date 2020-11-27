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
 * 文件容器
 */
interface IFileContainerProps {
  dataSource: any[];
  canCreateFolder?: boolean;
  type: 'person' | 'group';
  tools?: IToolBar[];
  contextMenu?: IContextMenu[];
  onCreateFolder?: () => void;
  onSearch?: (name: string) => void;
}

/**
 * 表格、图标列表
 */
interface ITableIconProps {
  dataSource: any[];
  scrollSelector?: string | Element;
  tools?: any[];
  contextMenu?: IContextMenu[];
  columns?: IColumn[];
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
  onClick?: () => void
}

/**
 * 文件、文件夹操作接口
 */
interface IOperateProps {
  visible: boolean;
  onSubmit?: (data: any) => void;
  onCancel?: () => void
}

export { INavItem, IFileContainerProps, ITableIconProps, IContextMenu, IToolBar, IOperateProps, IFormInstance, ColumnsType };
