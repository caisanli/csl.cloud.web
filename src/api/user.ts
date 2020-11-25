import { get, post, del, put } from '@/utils/request'

export const getAll = () => {
  return get('/user')
}
