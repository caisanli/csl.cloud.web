import { IToolBar } from '@/types'
import { CopyOutlined, DeleteOutlined, DownloadOutlined, EditOutlined, ShareAltOutlined } from '@ant-design/icons'
import React from 'react'

export const downBtn:IToolBar = {
  name: '下载',
  type: 'download',
  icon: <DownloadOutlined />
}
export const shareBtn:IToolBar = {
  name: '分享',
  type: 'share',
  icon: <ShareAltOutlined />,
}
export const delBtn:IToolBar = {
  name: '删除',
  type: 'delete',
  icon: <DeleteOutlined />,
}
export const renameBtn:IToolBar = {
  name: '重命名',
  type: 'rename',
  icon: <EditOutlined />,
}
export const copyBtn:IToolBar = {
  name: '复制',
  type: 'copy',
  icon: <CopyOutlined />,
}
export const moveBtn:IToolBar = {
  name: '移动到',
  type: 'move',
}
