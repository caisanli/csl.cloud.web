import { INavItem } from '@/types';
const personMenu: INavItem[] = [
  {
    name: '全部文件',
    value: 'file',
    path: '/',
    icon: 'icon-wenjian',
  },
  {
    name: '图片',
    value: 'image',
    path: '/index/image',
    icon: '',
  },
  {
    name: '文档',
    value: 'document',
    path: '/index/document',
    icon: '',
  },
  {
    name: '视频',
    value: 'video',
    path: '/index/video',
    icon: '',
  },
  {
    name: '其它',
    value: 'other',
    path: '/index/other',
    icon: '',
  },
  {
    name: '我的分享',
    value: 'share',
    path: '/index/share',
    icon: 'icon-fenxiang',
  },
  {
    name: '回收站',
    value: 'recycleBin',
    path: '/index/recycleBin',
    icon: 'icon-lajitong',
  },
];
const groupMenu: INavItem[] = [
  {
    name: '全部文件',
    value: 'file',
    path: '/group/file',
    icon: 'icon-wenjian',
  },
  {
    name: '图片',
    value: 'image',
    path: '/group/image',
    icon: '',
  },
  {
    name: '文档',
    value: 'document',
    path: '/group/document',
    icon: '',
  },
  {
    name: '视频',
    value: 'video',
    path: '/group/video',
    icon: '',
  },
  {
    name: '其它',
    value: 'other',
    path: '/group/other',
    icon: '',
  },
  {
    name: '配置',
    value: 'config',
    path: '/group/config',
    icon: '',
  },
  {
    name: '审批',
    value: 'approval',
    path: '/group/approval',
    icon: '',
  },
];
export { personMenu, groupMenu };
