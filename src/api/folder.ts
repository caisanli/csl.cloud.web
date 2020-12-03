import { Result } from '@/types';
import { get, post, put, del } from '@/utils/request';

export default {
  /**
   * 创建
   * @param {string} parentId
   * @param {string} name
   * @param {string} [description='']
   * @returns {Promise<any>}
   */
  create(parentId: string, name: string, description: string = ''): Promise<Result> {
    return post('/folder', { parentId, name, description });
  },
  /**
   * 更新
   * @param {string} id
   * @param {string} name
   * @param {string} [description='']
   * @returns {Promise<Result>}
   */
  update(id: string, name: string, description: string = ''): Promise<Result> {
    return put('/folder/' + id, { name, description })
  },
  /**
   * 获取某个文件夹
   * @param {string} id
   * @returns {Promise<Result>}
   */
  getById(id: string): Promise<Result> {
    return get('/folder/' + id);
  },
  /**
   * 删除文件夹
   * @param {string} id
   * @returns {Promise<Result>}
   */
  remove(id: string): Promise<Result> {
    return del('/folder/' + id);
  },
  /**
   * 获取子文件夹包括面包屑
   * @param {string} id
   * @returns {Promise<Result>}
   */
  getChildren(id: string): Promise<Result> {
    return get('/folder/' + id + '/children')
  }
}
