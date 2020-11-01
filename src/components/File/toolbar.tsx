import React, { ReactNode } from 'react';
import { Upload, Button } from 'antd';
import { UploadOutlined, FolderAddOutlined } from '@ant-design/icons';
import styles from './index.module.less';

interface ITool {
  name: string;
  icon?: ReactNode;
  type: string;
}

interface IProps {
  canCreateFolder?: boolean;
  tools: ITool[];
  onClick?: (type: string) => void;
}

export default function(props: IProps) {
  function onClick(tool: ITool) {
    const type = tool.type || '';
    props.onClick && props.onClick(type);
  }

  return (
    <div className={styles.toolbar}>
      <div className={styles.toolbarLeft}>
        <Upload className={styles.uploadBtn}>
          <Button type="primary" icon={<UploadOutlined />}>
            上传
          </Button>
        </Upload>
        {props.canCreateFolder ? (
          <Button style={{ marginRight: '10px' }} icon={<FolderAddOutlined />}>
            新建文件夹
          </Button>
        ) : null}
        {props.tools.map(tool => (
          <Button
            className={styles.toolBtn}
            key={tool.type}
            icon={tool.icon}
            onClick={() => onClick(tool)}
          >
            {tool.name}
          </Button>
        ))}
      </div>
      <div className={styles.toolbarRight}></div>
    </div>
  );
}
