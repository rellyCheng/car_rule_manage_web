import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';
import RendererWrapper0 from 'E:/workSpace/car_rule_manage_web/src/pages/.umi/LocaleWrapper.jsx'
import _dvaDynamic from 'dva/dynamic'

let Router = require('dva/router').routerRedux.ConnectedRouter;

let routes = [
  {
    "path": "/user",
    "component": _dvaDynamic({
  
  component: () => import('../../layouts/UserLayout'),
  LoadingComponent: require('E:/workSpace/car_rule_manage_web/src/components/PageLoading/index').default,
}),
    "routes": [
      {
        "path": "/user",
        "redirect": "/user/login",
        "exact": true
      },
      {
        "path": "/user/login",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('E:/workSpace/car_rule_manage_web/src/pages/User/models/userManage.js').then(m => { return { namespace: 'userManage',...m.default}})
],
  component: () => import('../User/Login'),
  LoadingComponent: require('E:/workSpace/car_rule_manage_web/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "component": () => React.createElement(require('E:/workSpace/car_rule_manage_web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "path": "/",
    "component": _dvaDynamic({
  
  component: () => import('../../layouts/BasicLayout'),
  LoadingComponent: require('E:/workSpace/car_rule_manage_web/src/components/PageLoading/index').default,
}),
    "Routes": [require('../Authorized').default],
    "routes": [
      {
        "path": "/",
        "redirect": "/user/login",
        "exact": true
      },
      {
        "path": "/index",
        "name": "index",
        "icon": "home",
        "component": _dvaDynamic({
  
  component: () => import('../Home/Index'),
  LoadingComponent: require('E:/workSpace/car_rule_manage_web/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/userManage",
        "name": "userManage",
        "icon": "user",
        "authority": [
          "admin"
        ],
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('E:/workSpace/car_rule_manage_web/src/pages/User/models/userManage.js').then(m => { return { namespace: 'userManage',...m.default}})
],
  component: () => import('../User/UserManage'),
  LoadingComponent: require('E:/workSpace/car_rule_manage_web/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/userManage/addUserInfo",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('E:/workSpace/car_rule_manage_web/src/pages/User/models/userManage.js').then(m => { return { namespace: 'userManage',...m.default}})
],
  component: () => import('../User/AddUserInfo'),
  LoadingComponent: require('E:/workSpace/car_rule_manage_web/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/brokeManage",
        "name": "brokeManage",
        "icon": "user",
        "authority": [
          "admin"
        ],
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('E:/workSpace/car_rule_manage_web/src/pages/BrokeInfoManage/models/brokeManage.js').then(m => { return { namespace: 'brokeManage',...m.default}})
],
  component: () => import('../BrokeInfoManage/BrokeInfoManage'),
  LoadingComponent: require('E:/workSpace/car_rule_manage_web/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/myBrokeManage",
        "name": "myBrokeManage",
        "icon": "user",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('E:/workSpace/car_rule_manage_web/src/pages/BrokeInfoManage/models/brokeManage.js').then(m => { return { namespace: 'brokeManage',...m.default}})
],
  component: () => import('../BrokeInfoManage/MyBrokeInfoManage'),
  LoadingComponent: require('E:/workSpace/car_rule_manage_web/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "component": _dvaDynamic({
  
  component: () => import('../404'),
  LoadingComponent: require('E:/workSpace/car_rule_manage_web/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "component": () => React.createElement(require('E:/workSpace/car_rule_manage_web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "component": () => React.createElement(require('E:/workSpace/car_rule_manage_web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
  }
];
window.g_routes = routes;
window.g_plugins.applyForEach('patchRoutes', { initialValue: routes });

// route change handler
function routeChangeHandler(location, action) {
  window.g_plugins.applyForEach('onRouteChange', {
    initialValue: {
      routes,
      location,
      action,
    },
  });
}
window.g_history.listen(routeChangeHandler);
routeChangeHandler(window.g_history.location);

export default function RouterWrapper() {
  return (
<RendererWrapper0>
          <Router history={window.g_history}>
      { renderRoutes(routes, {}) }
    </Router>
        </RendererWrapper0>
  );
}
