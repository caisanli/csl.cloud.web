import React, { useState, useEffect } from 'react';
import { FileModelState, ConnectProps, connect } from 'umi';
import FileContainer from '@/components/FileContainer';
import { ICrumbItem, IPage } from '@/types';
import fileApi from '@/api/file';
interface IProps extends ConnectProps {
  file: FileModelState;
}

const Index = function(props: IProps) {
  const [crumbs, setCrumbs] = useState<ICrumbItem[]>([]);
  const [list, setList] = useState([]);
  const [page, setPage] = useState<IPage>();
  const {
    folder,
    name,
    sort: { order, type },
    no,
  } = props.file;
  // 查询文件
  async function query() {
    const {
      data: { crumbs, files, folders, page },
    } = await fileApi.query(folder, type, order, no, 10, name);
    setPage(page);
    setCrumbs(crumbs);
    if (no === 1) {
      setList(folders.concat(files));
    } else {
      setList(list.concat(files));
    }
  }

  useEffect(
    function() {
      query();
    },
    [props.file],
  );

  return (
    <>
      <FileContainer
        dataSource={list}
        type="person"
        canCreateFolder
        crumbs={crumbs}
        page={page}
      />
    </>
  );
};
const mapStateToProps = state => ({
  file: state.file,
});
export default connect(mapStateToProps)(Index);
