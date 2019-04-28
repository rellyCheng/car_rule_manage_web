

export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [{
        path: '/user',
        redirect: '/user/login'
      },
      {
        path: '/user/login',
        component: './User/Login'
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      // dashboard
      {
        path: '/',
        redirect: '/user/login'
      },


        //首页
      {
          path: '/index',
          name: 'index',
          icon: 'home',
          component: './Home/Index',
      },

         //用户管理页面/只有拥有admin权限的才可以看到
      {
          path: '/userManage',
          name: 'userManage',
          icon: 'user',
          authority: ['admin'],
          component: './User/UserManage',
      },
      {
        path: '/userManage/addUserInfo',
        component: './User/AddUserInfo',
      },
            //违章管理页面/只有拥有admin权限的才可以看到
      {
          path: '/brokeManage',
          name: 'brokeManage',
          icon: 'user',
          authority: ['admin'],
          component: './BrokeInfoManage/BrokeInfoManage',
      },

        //我的违章管理页面
      {
          path: '/myBrokeManage',
          name: 'myBrokeManage',
          icon: 'user',
          component: './BrokeInfoManage/MyBrokeInfoManage',
      },


      {
        component: '404',
      },
    ],
  },
];
