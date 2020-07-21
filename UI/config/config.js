import defaultSettings from './defaultSettings'; // https://umijs.org/config/

import os from 'os';
import slash from 'slash2';
import webpackPlugin from './plugin.config';
const { pwa, primaryColor } = defaultSettings; // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION, TEST, NODE_ENV } = process.env;
const plugins = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      pwa: pwa
        ? {
            workboxPluginMode: 'InjectManifest',
            workboxOptions: {
              importWorkboxFrom: 'local',
            },
          }
        : false,
      ...(!TEST && os.platform() === 'darwin'
        ? {
            dll: {
              include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
              exclude: ['@babel/runtime', 'netlify-lambda'],
            },
            hardSource: false,
          }
        : {}),
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
]; // 针对 preview.pro.ant.design 的 GA 统计代码
// preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
  plugins.push([
    'umi-plugin-ga',
    {
      code: 'UA-72788897-6',
    },
  ]);
}

const uglifyJSOptions =
  NODE_ENV === 'production'
    ? {
        uglifyOptions: {
          // remove console.* except console.error
          compress: {
            drop_console: true,
            pure_funcs: ['console.error'],
          },
        },
      }
    : {};
export default {
  // add for transfer to umi
  plugins,
  define: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  block: {
    defaultGitUrl: 'https://github.com/ant-design/pro-blocks',
  },
  treeShaking: true,
  targets: {
    ie: 11,
  },
  devtool: ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION ? 'source-map' : false,
  // 路由配置
  routes: [
    // user
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        { path: '/user', redirect: '/user/login' },
        { path: '/user/login', component: './User/Login' },
      ],
    },
    {
      path: '/',
      component: '../layouts/BasicLayout',
      Routes: ['src/pages/Authorized'],
      authority: ['admin', 'user'],
      routes: [
        {
          path: '/',
          name: '首页',
          icon: 'area-chart',
          component: './Home/home',
        },
        {
          path: '/case',
          name: '用例管理',
          icon: 'bank',
          routes: [
            {
              path: '/case/ui',
              name: 'WEB UI 用例',
              component: './Case/index',
            },
          ],
        },
        {
          path: '/task',
          name: '任务管理',
          icon: 'apartment',
          routes: [
            {
              path: '/task/ui/immediate',
              name: '即时任务',
              hideChildrenInMenu: true,
              routes: [
                {
                  path: '/task/ui/immediate',
                  redirect: '/task/ui/immediate/list',
                },
                {
                  path: '/task/ui/immediate/list',
                  name: '任务列表',
                  component: './Task/immediate',
                },
                {
                  path: '/task/ui/immediate/add',
                  name: '新建任务',
                  component: './Task/add',
                },
                {
                  path: '/task/ui/immediate/report',
                  name: '任务报告',
                  component: './Task/immReport',
                },
                {
                  path: '/task/ui/immediate/detail',
                  name: '任务详情',
                  component: './Task/immDetail',
                },
              ],
            },{
              path: '/task/ui/timing',
              name: '定时任务',
              hideChildrenInMenu: true,
              routes: [
                {
                  path: '/task/ui/timing',
                  redirect: '/task/ui/timing/list',
                },
                {
                  path: '/task/ui/timing/list',
                  name: '任务列表',
                  component: './Task/timing',
                },
                {
                  path: '/task/ui/timing/add',
                  name: '新建任务',
                  component: './Task/timAdd',
                },
                {
                  path: '/task/ui/timing/report',
                  name: '任务报告',
                  component: './Task/timReport',
                },
                {
                  path: '/task/ui/timing/detail',
                  name: '任务详情',
                  component: './Task/timDetail',
                },
              ],
            },
          ],
        },
        {
          path: '/config',
          name: '配置管理',
          icon: 'code-sandbox',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/config/project',
              name: '项目配置',
              component: './Config/project',
            },
            {
              path: '/config/projectVersion',
              name: '版本管理',
              component: './Config/projectVersion',
            },
            {
              path: '/config/proxy',
              name: '代理配置',
              component: './Config/proxy',
            },
            {
              path: '/config/keywords',
              name: '关键词管理',
              component: './Config/keywords',
            },
          ],
        },
        {
          path: '/system',
          name: '系统管理',
          icon: 'setting',
          authority: ['admin'],
          routes: [
            {
              path: '/system/users',
              name: '用户管理',
              icon: 'user',
              component: './System/users',
            },
          ],
        },
        // {
        //   path: '/test',
        //   name: 'test',
        //   icon: 'bank',
        //   component: './Test/index',
        // },
      ],
    },
  ],
  theme: {
    'primary-color': primaryColor,
  },
  proxy: {
    '/api/': {
      target: 'http://127.0.0.1:5000/',
      changeOrigin: true,
      // pathRewrite: { '^/server': '' },
    },
    '/img/': {
      target: 'http://127.0.0.1:5000/',
      changeOrigin: true,
      pathRewrite: { '^/img': ''},
    },
    '/socket.io': {
      target: "http://127.0.0.1:5000",
      changeOrigin: true,
      ws: false,
      secure: false,
    }
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, localIdentName, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },
  uglifyJSOptions,
  chainWebpack: webpackPlugin,
};
