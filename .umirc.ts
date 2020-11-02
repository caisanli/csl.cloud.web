import { defineConfig } from 'umi';
import path from 'path';
function resolve(_path) {
  return path.relative(__dirname, _path);
}
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  history: {
    type: 'hash',
  },
  // 静态资源访问
  publicPath: './',
  alias: {
    'comp': resolve('./src/components'),
    'utils': resolve('./src/utils'),
    'assets': resolve('./src/assets'),
  },
  cssLoader: {
    localsConvention: 'camelCase', // css类名驼峰
  },
  lessLoader: {
    modifyVars: {
      // 配置全局变量
      hack: "true; @import '~antd/lib/style/themes/default.less';",
    },
  },
});
