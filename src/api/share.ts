import { get, post } from '@/utils/request';

export default {
  /**
   * 分享文件
   * @param {string} users
   * @param {string} files
   * @param {string} folders
   * @returns
   */
  create(users: string, files: string, folders: string) {
    return post('/share', { users, files, folders });
  },
  /**
   * 获取我的分享
   * @returns
   */
  query() {
    return get('/share');
  },
  /**
   * 获取分享给我的
   * @returns
   */
  queryToMe() {
    return get('/share/toMe');
  },
  /**
   * 获取分享的详情（文件/文件夹）
   * @param {string} id
   * @returns
   */
  detail(id: string) {
    return get('/share/' + id + '/detail');
  },
};
