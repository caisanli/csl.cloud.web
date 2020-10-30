import {  } from 'antd';
interface route {
  path?: string;
  component?: any;
  exact?: boolean;
  routes?: route[];
  redirect?: string;
  wrappers?: string[];
  title?: string;
}

/**
 * 修改路由
 * @param param
 * ps：和 render 配置配合使用，请求服务端根据响应动态更新路由，
 */
export function patchRoutes({ routes }) {
  // routes.unshift({
  //   path: '/foo',
  //   exact: true,
  //   component: require('@/extraRoutes/foo').default,
  // });
}
/**
 * 覆盖render
 * @param oldRender
 * ps：比如用于渲染之前做权限校验，
 * ps：和patchRoutes 配置配合使用，请求服务端根据响应动态更新路由，
 */
export function render(oldRender) {
  // console.log(oldRender)
  // fetch('/api/routes').then((res) => { extraRoutes = res.routes })

  // fetch('/api/auth').then(auth => {
  //   if (auth.isLogin) { oldRender() }
  //   else {
  //     history.push('/login');
  //     oldRender()
  //   }
  // });
  oldRender();
}

/**
 * 在初始加载和路由切换时做一些事情。
 * @param param
 * ps：比如用于做埋点统计，
 * ps：比如用于设置标题
 */
export function onRouteChange({ location, routes, action }) {
  console.log(location);
}

/**
 *
 * @param container
 * 修改交给 react-dom 渲染时的根组件。
 * 比如用于在外面包一个 Provider，
 */
// export function rootContainer(container) {
//   console.log(container)
//   return React.createElement(ThemeProvider, null, container);
// }
