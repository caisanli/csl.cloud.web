import { get, post, del, put } from '@/utils/request'

export default {
  // 查询用户
  query: (name?: string) => {
    return get('/user', { name })
  }
}
