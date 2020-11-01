import { INavItem } from '@/types';
const nav: INavItem[] = [
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

export default nav;
