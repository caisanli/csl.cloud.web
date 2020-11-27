import { get, post, del, put } from '@/utils/request'

export default {
  // 查询用户
  query: (name?: string) => {
    return get('/user', { name })
  },
  // 创建用户
  create: (name: string, phone?: string, email?: string) => {
    return post('/user', { name, phone, email })
  },
  // 更新用户
  update: (id: string, name: string, phone?: string, email?: string) => {
    return put('/user/' + id, { name, phone, email })
  },
  // 根据ID获取信息
  get(id: string) {
    return get('/user/' + id);
  }
}
