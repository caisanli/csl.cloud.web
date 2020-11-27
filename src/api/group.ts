import { get, post, del, put } from '@/utils/request'

export default {
  // 查询团队
  query(name?: string) {
    return get('/group', { name })
  },
  // 创建团队
  create(name: string, userId: string, size: number, description?: string) {
    return post('/group', { name, userId, size, description })
  },
  // 更新团队
  update(id: string, name: string, userId: string, size: number, description?: string) {
    return put('/group/' + id, { name, userId, size, description })
  },
  // 删除团队
  remove(id: string) {
    return del('/group/' + id)
  },
  // 根据ID获取团队信息
  get(id: string) {
    return get('/group/' + id)
  },
  // 根据用户获取对应团队
  getByUser(userId: string) {
    return get('/group/user/' + userId)
  }
}
