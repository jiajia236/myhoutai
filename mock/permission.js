[
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: '商品管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'product',
        name: 'Product',
        component: () => import('@/views/product/index'),
        meta: { title: '商品列表', icon: 'table' }
      },
      // {
      //   path: 'tree',
      //   name: 'Tree',
      //   component: () => import('@/views/tree/index'),
      //   meta: { title: 'Tree', icon: 'tree' }
      // }
    ]
  },

  {
    path: '/editproduct',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index/:pid',
        name: 'editproduct',
        props: true,
        component: () => import('@/views/editproduct/index'),
        meta: { title: '编辑商品', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: '用户管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'userlist',
        component: () => import('@/views/user/userlist/index'), // Parent router-view
        name: 'Userlist',
        meta: { title: '用户列表', icon: 'table' },
      },
      {
        path: 'userrole',
        component: () => import('@/views/user/userrole/index'),
        name: 'Userrole',
        meta: { title: '角色管理', icon: 'user' }
      },
      {
        path: 'userpower',
        component: () => import('@/views/user/userpower/index'),
        name: 'Userpower',
        meta: { title: '权限管理', icon: 'form' }
      }
    ]
  },

  {
    path: '/ceshi1',
    component: Layout,
    name: 'Ceshi1',
    meta: { title: '测试页面1', icon: 'user' },
    children: [{
      path: 'cesh1',
      name: 'Cesh1',
      component: () => import('@/views/ceshi/ceshi1'),
      meta: { title: '测试页面1', icon: 'dashboard' }
    }]
  },
  {
    path: '/ceshi2',
    component: Layout,
    name: 'Ceshi2',
    meta: { title: '测试页面2', icon: 'user' },
    children: [{
      path: 'cesh2',
      name: 'Cesh2',
      component: () => import('@/views/ceshi/ceshi2'),
      meta: { title: '测试页面2', icon: 'dashboard' }
    }]
  },
]
        
