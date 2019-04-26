

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


      {
        component: '404',
      },
    ],
  },
];
