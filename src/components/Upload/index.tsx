import React, { useEffect, useState } from 'react';
import { post } from '@/utils/request';
import { Button } from 'antd';
import List from './List';
import { uuid } from '@/utils';
import styles from './index.module.less';
import { IUploadFile } from '@/types';

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

const Index = function(props: IUploadProps & typeof defaultProps) {
  const { chunkSize, onSuccess, action, fileName, data } = props;
  const [ list, setList ] = useState<IUploadFile[]>([])
  const CHUNK_SIZE = chunkSize;

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    if(!e || !e.target || !e.target.files)
      return ;
    addFileList([...e.target.files]);
  }

  useEffect(() => {
    console.log('更新后的：',list)
  }, [list])

  function addFileList(files: IUploadFile[]) {
    let successFiles: IUploadFile[] = [];
    let uFiles: IUploadFile[] = [];
    files.forEach(file => {
      if(!testFile(file))
        return ;
      handleFile(file);
      uFiles.push(file);
      successFiles.push(file);
    })
    setList(successFiles)
    uploadFiles(uFiles)
  }

  // 检验文件
  function testFile(file: IUploadFile):boolean {
    return true;
  }

  // 处理文件
  function handleFile(file: IUploadFile) {
    file.id = uuid();
    file.process = 0;
    file.folder = '';
    file.status = 'waiting';
  }

  // 上传文件列表
  function uploadFiles(files: IUploadFile[]) {
    const file = files.shift();
    if(file) {
      file.status = 'pending';
      uploadBefore(file, () => {
        uploadFiles(files);
      });
    } else {
      console.log('全部上传完成...')
    }
  }

  // 上传前
  function uploadBefore(file: IUploadFile, callback: () => void) {
    const chunks = Math.ceil(file.size / CHUNK_SIZE);
    upload(chunks, file, 0, callback)
  }

  // 上传
  function upload(total: number, file: IUploadFile, index = 0, callback: () => void) {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    })
    formData.append('name', file.name)
    formData.append('size', file.size + '');
    formData.append('chunks', total + '')
    formData.append('chunk', (index + 1) + '');
    formData.append('modifyDate', new Date(file.lastModified).getTime() + '');
    let start = index * CHUNK_SIZE;
    let end = CHUNK_SIZE * (index + 1);
    end = end > file.size ? file.size : end;
    formData.append(fileName, file.slice(start, end))
    post(action, formData).then(res => {
      if (res.code === 1) {
        index++;
        if (index >= total) { // 所有分片上传完成
          file.process = 100;
          file.status = 'success';
          onSuccess && onSuccess(res);
          callback();
          return;
        }
        file.process = (res.data.process * 100);
        upload(total, file, index, callback);
      }
    }).catch(err => {
      file.status = 'error';
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
        multiple
      />
      <List
        list={ list }
        message="已完成"
      />
    </div>
  )
}
Index.defaultProps = defaultProps;
export default Index;
