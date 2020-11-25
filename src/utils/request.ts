import { extend, RequestOptionsInit, ResponseInterceptor } from 'umi-request';
import { message as Message } from 'antd';
import { BASE_URL, PREFIX } from './config';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const errorHandler = error => {
  if(!error) throw error ;
  if (error.response) {
    const response = error.response;
    // 请求已发送但服务端返回状态码非 2xx 的响应
    const errorText = codeMessage[response.status] || response.statusText;
    // const { status, url } = response;
    Message.error(errorText);
  } else {
    // 请求初始化时出错或者没有响应返回的异常
    Message.error(error.message);
  }
  throw error; // 如果throw. 错误将继续抛出.
};


const request = extend({
  errorHandler, // 默认错误处理
  prefix: BASE_URL + PREFIX,
  credentials: 'include', // 默认请求是否带上cookie
})

request.interceptors.response.use(async (response) => {
  // 克隆响应对象做解析处理
  // 这里的res就是我们请求到的数据
  try {
    const res = await response.clone().json();
    const { code } = res;
    if (code !== 1) {
      return Promise.reject(res);
      // 在处理结果时判断res是否有值即可
    } else {
      return res;
    }
  } catch (error) {
    return Promise.reject(error);
  }

});

const get = function(url: string, params?: any, options?: RequestOptionsInit) {
  return request(url, Object.assign({}, options, { params }))
}
const post = function(url: string, data?: any, options?: RequestOptionsInit) {
  return request(url, Object.assign({}, options, { data, method: 'POST' }))
}
const put = function(url: string, data?: any, options?: RequestOptionsInit) {
  return request(url, Object.assign({}, options, { data, method: 'PUT' }))
}
const del = function(url: string, params?: any, options?: RequestOptionsInit) {
  return request(url, Object.assign({}, options, { params, method: 'DELETE' }))
}
export { get, post, del, put }

export default request;
