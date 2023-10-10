import React, { useEffect, useState } from 'react';
import { post } from '@/utils/request';
import useRefState from '@/hooks/useRefState';
import { Button } from 'antd';
import List from './List';
import { uuid } from '@/utils';
import styles from './index.module.less';
import { IUploadFile } from '@/types';
import { FileItem } from './List';
const defaultProps = {
  fileName: 'file',
  chunkSize: 4 * 1024 * 1024, // 4M
  action: '',
  data: {},
};
export interface IUploadProps {
  children?: React.ReactNode;
  fileName?: string;
  action?: string;
  chunkSize?: number;
  data?: {
    [key: string]: any;
  };
  style?: React.CSSProperties;
  onSuccess?: (data: any) => void;
}
type State = {
  list: FileItem[];
};

class Index extends React.Component<IUploadProps, State> {
  constructor(props: IUploadProps) {
    super(props);
    this.state = {
      list: [],
    };
    this.onChange = this.onChange.bind(this);
    this.CHUNK_SIZE = props.chunkSize!;
  }

  CHUNK_SIZE: number;

  static defaultProps = defaultProps;

  onChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e || !e.target || !e.target.files) return;
    this.addFileList([...e.target.files]);
  }

  addFileList(files: IUploadFile[]) {
    let successFiles: FileItem[] = [];
    let uFiles: IUploadFile[] = [];
    files.forEach(file => {
      if (!this.testFile(file)) return;
      this.handleFile(file);
      uFiles.push(file);
      successFiles.push({
        name: file.name,
        id: file.id || '',
        folder: '根目录',
        size: file.size,
        process: 0,
        status: 'waiting',
      });
    });
    this.setState({
      list: this.state.list.concat(successFiles),
    });
    this.uploadFiles(uFiles);
  }

  // 检验文件
  testFile(file: IUploadFile): boolean {
    return true;
  }

  // 处理文件
  handleFile(file: IUploadFile) {
    file.id = uuid();
    file.process = 0;
    file.folder = '';
    file.status = 'waiting';
  }

  // 上传文件列表
  uploadFiles(files: IUploadFile[]) {
    const file = files.shift();
    if (file) {
      file.status = 'pending';
      this.uploadBefore(file, () => {
        this.uploadFiles(files);
      });
    } else {
      console.log('全部上传完成...');
    }
  }

  setFileStatus(id: string = '', value: any) {
    let index = 0,
      newList = [...this.state.list];
    let activeItem = newList.find((item, i) => {
      index = i;
      return item.id === id;
    });
    if (!activeItem) return;
    let newItem = Object.assign({}, activeItem, value);
    newList.splice(index, 1, newItem);
    this.setState({
      list: newList,
    });
  }

  // 上传前
  uploadBefore(file: IUploadFile, callback: () => void) {
    // 确定总的分片数量
    const chunks = Math.ceil(file.size / this.CHUNK_SIZE);
    this.upload(chunks, file, 0, callback);
  }

  // 上传
  upload(total: number, file: IUploadFile, index = 0, callback: () => void) {
    let { data = {}, fileName = '', action = '', onSuccess } = this.props;
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });
    formData.append('name', file.name);
    formData.append('size', file.size + '');
    formData.append('chunks', total + '');
    formData.append('chunk', index + 1 + '');
    formData.append('modifyDate', new Date(file.lastModified).getTime() + '');
    let start = index * this.CHUNK_SIZE;
    let end = this.CHUNK_SIZE * (index + 1);
    end = end > file.size ? file.size : end;
    formData.append(fileName, file.slice(start, end));
    post(action, formData)
      .then(res => {
        if (res.code === 1) {
          index++;
          if (index >= total) {
            // 所有分片上传完成
            file.process = 100;
            file.status = 'success';
            this.setFileStatus(file.id, {
              status: 'success',
              process: 100,
            });
            onSuccess && onSuccess(res);
            callback();
            return;
          }
          let process = res.data.process;
          file.process = process;
          this.setFileStatus(file.id, {
            process,
            status: 'pending',
          });
          this.upload(total, file, index, callback);
        }
      })
      .catch(err => {
        file.status = 'error';
        console.log(err);
      });
  }

  render() {
    let props = this.props;
    let { list } = this.state;
    return (
      <div className={styles.upload} style={props.style}>
        {props.children ? (
          props.children
        ) : (
          <Button size="small" type="primary">
            上传
          </Button>
        )}
        <input
          onChange={this.onChange}
          className={styles.uploadInput}
          type="file"
          multiple
        />
        <List list={list} message="已完成" />
      </div>
    );
  }
}

Index.defaultProps = defaultProps;
export default Index;
