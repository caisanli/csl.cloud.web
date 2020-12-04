import React from 'react';
import { post } from '@/utils/request';
import {createPortal} from 'react-dom';
import { Button } from 'antd';

const defaultProps = {
  fileName: 'file',
  chunkSize: 4 * 1024 * 1024, // 4M
  action: '',
  data: {}
}
export interface IUploadProps {
  children?: React.ReactNode;
  fileName?: string;
  action?: string;
  chunkSize?: number;
  data?: {
    [key:string]: any
  };
  style?: React.CSSProperties;
  onSuccess?: (data: any) => void;
};

import styles from './index.module.less';
const doc = window.document;
const node = doc.createElement('div');
doc.body.appendChild(node);
const Index = function(props: IUploadProps & typeof defaultProps) {
  const { chunkSize, onSuccess, action, fileName, data } = props;
  const CHUNK_SIZE = chunkSize;

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    if(!e || !e.target || !e.target.files)
      return ;
    addFileList([...e.target.files]);

  }
  function addFileList(files: File[]) {
    let successFiles:File[] = []
    files.forEach(file => {
      if(!testFile(file))
        return ;
      handleFile(file);
      successFiles.push(file);
    })
    uploadFiles(successFiles)
  }
  // 检验文件
  function testFile(file: File):boolean {
    return true;
  }

  // 处理文件
  function handleFile(file: File) {

  }

  // 上传文件列表
  function uploadFiles(files: File[]) {
    const file = files.shift();
    if(file) {
      uploadBefore(file, () => {
        uploadFiles(files);
      });
    } else {
      alert('全部上传完成...')
    }
  }

  // 上传前
  function uploadBefore(file: File, callback: () => void) {
    const chunks = Math.ceil(file.size / CHUNK_SIZE);
    upload(chunks, file, 0, callback)
  }

  // 上传
  function upload(total, file, index = 0, callback: () => void) {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    })
    formData.append('name', file.name)
    formData.append('size', file.size);
    formData.append('chunks', total)
    formData.append('chunk', (index + 1) + '');
    formData.append('modifyDate', new Date(file.lastModifiedDate).getTime() + '')
    let start = index * CHUNK_SIZE;
    let end = CHUNK_SIZE * (index + 1);
    end = end > file.size ? file.size : end;
    formData.append(fileName, file.slice(start, end))
    post(action, formData).then(res => {
      if (res.code === 1) {
        index++;
        if (index >= total) { // 所有分片上传完成
          // alert('上传完成')
          onSuccess && onSuccess(res);
          callback();
          return;
        }
        upload(total, file, index, callback)
      }
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <div
      className={ styles.upload }
      style={ props.style }
    >
      {
        props.children
        ? props.children
        : <Button size="small" type="primary">上传</Button>
      }
      <input
        onChange={ onChange }
        className={ styles.uploadInput }
        type="file"
      />
    </div>
  )
}
Index.defaultProps = defaultProps;
export default Index;
