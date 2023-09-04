import { Result } from '@/types';
import { get, post, put, del } from '@/utils/request';

export default {
  /**
   * 创建
   * @param {string} parentId
   * @param {string} groupId
   * @param {string} name
   * @param {string} [description='']
   * @returns {Promise<any>}
   */
  create(
    parentId: string,
    groupId: string,
    name: string,
    description: string = '',
  ): Promise<Result> {
    return post('/group/folder', { parentId, groupId, name, description });
  },
  /**
   * 更新
   * @param {string} id
   * @param {string} name
   * @param {string} groupId
   * @param {string} [description='']
   * @returns {Promise<Result>}
   */
  update(
    id: string,
    name: string,
    groupId: string,
    description: string = '',
  ): Promise<Result> {
    return put('/group/folder/' + id, { name, groupId, description });
  },
  /**
   * 获取某个文件夹
   * @param {string} id
   * @returns {Promise<Result>}
   */
  getById(id: string): Promise<Result> {
    return get('/group/folder/' + id);
  },
  /**
   * 删除文件夹
   * @param {string} id
   * @returns {Promise<Result>}
   */
  remove(id: string): Promise<Result> {
    return del('/group/folder/' + id);
  },
  /**
   * 获取子文件夹包括面包屑
   * @param {string} id
   * @param {string} groupId
   * @returns {Promise<Result>}
   */
  getChildren(id: string, groupId: string): Promise<Result> {
    return get('/group/folder/' + id + '/children', { groupId });
  },
};
