import { Category, ORDER, SORT } from '@/types';
import { get, post, del, put } from '@/utils/request';
import { BASE_URL, PREFIX } from '@/utils/config';

export default {
  /**
   * 查询用户文件
   * @param {string} folderId 文件夹ID
   * @param {string} groupId 团队ID
   * @param {SORT} sort 排序类型
   * @param {ORDER} order 排序方式
   * @param {number} page 当前页
   * @param {number} num 每页多少条
   * @param {string} [name] 文件名称
   * @param {Category} [category] 分类
   * @returns
   */
  query(
    groupId: number,
    sort: SORT,
    order: ORDER,
    page: number,
    num: number,
    name?: string,
    folderId?: string,
    category?: Category,
  ) {
    return get('/group/file', {
      groupId,
      folderId,
      sort,
      order,
      page,
      num,
      name,
      category,
    });
  },
  /**
   * 根据ID获取文件
   * @param {string} id
   * @returns
   */
  getById(id: string) {
    return get('/group/file/' + id);
  },
  /**
   * 重命名文件
   * @param id
   * @param name
   * @returns
   */
  rename(id: string, name: string) {
    return put('/group/file/rename/' + id, { name });
  },
  /**
   * 上传文件
   * @param {string} folder 文件夹ID
   * @param {string} group 团队ID
   * @param {*} file file对象
   * @param {string} name 文件名称
   * @param {number} size 文件大小
   * @param {number} modifyDate 最后更新时间
   * @param {number} chunk 当前切片
   * @param {number} chunks 总切片数量
   * @returns
   */
  upload(
    folder: string,
    group: string,
    file: any,
    name: string,
    size: number,
    modifyDate: number,
    chunk: number,
    chunks: number,
  ) {
    let formData = new FormData();
    formData.append('folder', folder);
    formData.append('group', group);
    formData.append('name', name);
    formData.append('size', size + '');
    formData.append('modifyDate', modifyDate + '');
    formData.append('chunk', chunk + '');
    formData.append('chunks', chunks + '');
    formData.append('file', file);
    return post('/group/file/update', formData);
  },
  /**
   * 获取切片文件上传进度
   * @param {string} name 文件名称
   * @param {number} size 文件大小
   * @param {number} modifyDate 最后更新时间
   */
  getChunkProcess(name: string, size: number, modifyDate: number) {
    return get('/group/file/chunk/process', { name, size, modifyDate });
  },
  /**
   * 批量删除文件、文件夹
   * @param {string} fileIds
   * @param {string} folderIds
   * @returns
   */
  remove(fileIds: string = '', folderIds: string = '') {
    return del('/group/file/del', { fileIds, folderIds });
  },
  /**
   * 移动文件
   * @param {string} ids 文件集合 逗号分隔
   * @param {string} folderId 文件夹ID
   * @param groupId
   * @returns
   */
  move(ids: string, folderId: string, groupId: number) {
    return put('/group/file/move', { ids, folderId, groupId });
  },
  /**
   * 复制文件
   * @param {string} ids
   * @param {string} folderId
   * @param groupId
   * @returns
   */
  copy(ids: string, folderId: string, groupId: number) {
    return put('/group/file/copy', { ids, folderId, groupId });
  },
  /**
   * 下载文件
   * @param {string} files
   * @returns
   */
  download(files: string) {
    return get(
      '/group/file/folder/download',
      { files },
      {
        responseType: 'blob',
        getResponse: true,
        parseResponse: false,
      },
    );
  },
  preview(id: string): string {
    return BASE_URL + PREFIX + '/group/file/preview/' + id;
  },
};
