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
};
