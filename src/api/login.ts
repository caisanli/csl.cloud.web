import { del, post } from '@/utils/request';

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

/**
 * 管理员退出
 */
export const adminLogout = () => {
  return del('/login/admin/out')
}

/**
 * 用户退出
 */
export const logout = () => {
  return del('/login/out')
}

export default {
  adminLogin,
  login,
  adminLogout,
  logout
}
