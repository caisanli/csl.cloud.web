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
interface IFileContainerProps {
  data: any[];
  canCreateFolder?: boolean;
  type: 'person' | 'group';
}

export { INavItem, IFileContainerProps };
