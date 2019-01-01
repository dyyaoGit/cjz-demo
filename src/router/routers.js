import Main from '@/view/main'
import parentView from '@/components/parent-view'

/**
 * iview-2中meta除了原生参数外可配置的参数:
 * meta: {
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面不会缓存
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 * }
 */

export const loginRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: 'Login - 登录',
    hideInMenu: true
  },
  component: () =>
    import ('@/view/login/login.vue')
}

export const page404 = {
  path: '*',
  name: 'error_404',
  meta: {
    title: 'NOT FOUND',
    hideInMenu: true
  },
  component: () =>
    import ('@/view/error-page/404.vue')
}
export const page401 = {
  path: '/401',
  name: 'error_401',
  meta: {
    title: '无权限',
    hideInMenu: true
  },
  component: () =>
    import ('@/view/error-page/401.vue')
}
export const page500 = {
  path: '/500',
  name: 'error_500',
  meta: {
    title: '服务器故障',
    hideInMenu: true
  },
  component: () =>
    import ('@/view/error-page/500.vue')
}
// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
  path: '/',
  name: 'main',
  redirect: '/home',
  title: '首页',
  component: Main,
  meta: {
    hideInMenu: true,
    notCache: true,
    title: "首页"
  },
  children: [{
    path: 'home',
    name: 'home',
    meta: {
      hideInMenu: true,
      notCache: true,
      title: '首页'
    },
    component: () =>
      import ('@/view/single-page/home')
  }]
}
// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [{
    path: '/update',
    name: 'update',
    meta: {
      icon: 'md-cloud-upload',
      title: '导航一',
      isMenu: true
    },
    component: Main,
    children: [{
      path: 'update_table_page',
      name: 'update_table_page',
      meta: {
        icon: 'md-cloud-upload',
        title: '导航一',
        access: [1]
      },
      component: () =>
        import ('@/view/join-page.vue')
    }]
  },
  {
    path: '/multilevel',
    name: 'multilevel',
    meta: {
      icon: 'md-trending-up',
      title: '多级菜单',
      isMenu: true
    },
    component: Main,
    children: [{
        path: 'level_2_1',
        name: 'level_2_1',
        meta: {
          icon: 'md-trending-up',
          title: '二级-1',
        },
        component: () =>
          import ('@/view/multilevel/level-1.vue')
      },
      {
        path: 'level_2_2',
        name: 'level_2_2',
        meta: {
          icon: 'md-trending-up',
          title: '二级-2',
        },
        component: parentView,
        children: [{
          path: 'level_2_2_1',
          name: 'level_2_2_1',
          meta: {
            icon: 'md-trending-up',
            title: '三级',
          },
          component: () =>
            import ('@/view/multilevel/level-2/level-2-1.vue')
        }]
      },
      {
        path: 'level_2_3',
        name: 'level_2_3',
        meta: {
          icon: 'md-trending-up',
          title: '二级-3'
        },
        component: parentView,
        children: [{
            path: 'level_2_3_1',
            name: 'level_2_3_1',
            meta: {
              icon: 'md-trending-up',
              title: '三级-1'
            },
            component: () =>
              import ('@/view/multilevel/level-2/level-3/level-3-1.vue')
          },
          {
            path: 'level_2_3_2',
            name: 'level_2_3_2',
            meta: {
              access: [1],
              icon: 'md-trending-up',
              title: '三级-2'
            },
            component: () =>
              import ('@/view/multilevel/level-2/level-3/level-3-1.vue')
          }
        ]
      },
      {
        path: 'level_2_4',
        name: 'level_2_4',
        meta: {
          icon: 'md-trending-up',
          title: '二级-4'
        },
        component: parentView,
        children: [{
          path: 'level_2_4_1',
          name: 'level_2_4_1',
          meta: {
            icon: 'md-trending-up',
            title: '三级-1',
          },
          component: parentView,
          children: [{
            path: 'level_2_4_1_1',
            name: 'level_2_4_1_1',
            meta: {
              icon: 'md-trending-up',
              title: '四级-1',
              access: [1]
            },
            component: () =>
              import ('@/view/multilevel/level-2/level-2-1.vue')
          }]
        }]
      }
    ]
  },
]
export default [
  loginRouter,
  otherRouter,
  ...appRouter,
  page500,
  page401,
  page404
];