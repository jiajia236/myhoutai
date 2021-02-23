import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '后台管理系统', icon: 'dashboard' }
    }]
  },

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
    hidden:true,
    children: [
      {
        path: 'index/:pid',
        name: 'editproduct',
        props:true,
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
        meta: { title: '用户列表',icon:'table' },
      },
      {
        path: 'userrole',
        component: () => import('@/views/user/userrole/index'),
        name: 'Userrole',
        meta: { title: '角色管理',icon:'user' }
      },
      {
        path: 'userpower',
        component: () => import('@/views/user/userpower/index'),
        name: 'Userpower',
        meta: { title: '权限管理',icon:'form' }
      }
    ]
  },

  {
    path: '/ceshi1',
    component: Layout,
    name: 'Ceshi1',
    meta: { title: '测试页面1',icon:'user'},
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
    meta: { title: '测试页面2',icon:'user'},
    children: [{
      path: 'cesh2',
      name: 'Cesh2',
      component: () => import('@/views/ceshi/ceshi2'),
      meta: { title: '测试页面2', icon: 'dashboard' }
    }]
  },
  {
    path: '/ceshi3',
    component: Layout,
    name: 'Ceshi3',
    meta: { title: '测试页面3',icon:'user'},
    children: [{
      path: 'cesh3',
      name: 'Cesh3',
      component: () => import('@/views/ceshi/ceshi3'),
      meta: { title: '测试页面3', icon: 'dashboard' }
    }]
  },



  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
