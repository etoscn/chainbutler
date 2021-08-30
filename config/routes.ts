export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
          {
            name: 'register-result',
            path: '/user/registerresult',
            component: './user/RegisterResult',
          },
          {
            name: 'register',
            path: '/user/register',
            component: './user/Register',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/apps',
    name: 'apps',
    icon: 'AppstoreOutlined',
    routes: [
      {
        path: '/apps/list',
        name: 'list',
        component: './apps/List',
      },
      {
        path: '/apps/address',
        name: 'addresslist',
        component: './apps/Address',
      },
      {
        path: '/apps/balance',
        name: 'balancelist',
        component: './apps/Balance',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/order',
    name: 'order',
    icon: 'BarsOutlined',
    routes: [
      {
        path: '/order/list',
        name: 'list',
        component: './apps/OrderList',
      },
      {
        path: '/order/review',
        name: 'review',
        component: './apps/OrderReview',
      },
      {
        component: './404',
      },
    ],
  },

  {
    path: '/blockchain',
    name: 'blockchain',
    icon: 'AppstoreAddOutlined',
    routes: [
      {
        path: '/blockchain/allowlist',
        name: 'allowlist',
        component: './blockchain/AllowList',
      },
      {
        path: '/blockchain/explorer',
        name: 'explorer',
        component: './blockchain/Explorer',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/account',
    name: 'account',
    icon: 'AppstoreAddOutlined',
    hideInMenu: true,
    routes: [
      {
        name: 'settings',
        icon: 'smile',
        path: '/account/settings',
        component: './user/AccountSettings',
      },
      {
        component: './404',
      },
    ],
  },


 /* {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },*/
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
