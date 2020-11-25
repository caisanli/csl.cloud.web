import { post } from '@/utils/request';

/**
 * 管理员登录
 * @param password
 */
export const adminLogin = (password: string) => {
  return post('/login/admin', { password })
}

/**
 * 用户登录
 * @param name
 * @param password
 */
export const login = (name: string, password: string) => {
  return post('/login', { name, password });
}
