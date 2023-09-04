import React, { useEffect, useState } from 'react';
import { useParams } from 'umi';
import { Row, Col } from 'antd';
import Crumb from '@/components/Crumb';
import Scroll from '@/components/Scroll';
import shareApi from '@/api/share';
import fileApi from '@/api/file';
import { ICrumbItem, IPage } from '@/types';
import Table from '@/components/Table';
import { getBaseColumns } from '@/components/FileContainer/columns';

export default function() {
  const params = useParams<{id: string}>()
  const [param, setParam] = useState<{folder: string, no: number}>({folder: '0', no: 1});
  const [list, setList] = useState([]);
  const [crumbs, setCrumbs] = useState<ICrumbItem[]>([]);
  const [page, setPage] = useState<IPage>({page: 1, total: 0, count: 0});
  // 表格项
  const columns = getBaseColumns(onClickColumn);
  function onClickColumn(data: any) {
    if(data.parentId) {
      setParam({
        no: 1,
        folder: data.id
      })
    }
  }

  useEffect(() => {
    query();
  }, [param])

  // 查询
  async function query() {
    let { folder, no } = param;
    if(folder === '0') {
      let { data: { files, folders } } = await shareApi.detail(params.id)
      setList(folders.concat(files));
      setCrumbs([]);
    } else {
      let { data } = await fileApi.query('name', 'ASC', no, 100, '', folder);
      let { files, folders, crumbs, page } = data;
      if(page.page === 1) {
        setList(folders.concat(files))
      } else {
        setList(list.concat(files))
      }
      setCrumbs(crumbs);
      setPage(page);
    }
  }

  function onClick(item: ICrumbItem) {
    setParam({
      no: 1,
      folder: item.id
    })
  }
  // 滚动刷新
  let scrollTimer: NodeJS.Timeout;
  function onScroll(data: any) {
    if (scrollTimer) clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      if (!page) return;
      if (data.isBottom && data.isDown && page.page < page.count) {
        setParam({
          no: param.no + 1,
          folder: param.folder
        })
      }
    }, 500);
  }

  return (
    <>
      <Row justify="space-between" align="middle">
        <Col>
          <Crumb
            crumbs={crumbs}
            onClick={onClick}
          />
        </Col>
        <Col style={{paddingRight: '10px'}}>
          共{ list.length }项
        </Col>
      </Row>

      <Scroll onScroll={onScroll} onChange={onScroll}>
        <Table
          dataIndex='id'
          columns={columns}
          dataSource={list}
        />
      </Scroll>

    </>
  )
}
