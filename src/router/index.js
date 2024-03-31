import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home.vue'),
      meta: { 
      }, 
    }, 
    {
        path: '/detail/:shortcutName',
        name: 'detail',
        component: () => import('@/views/detailView.vue'),
        meta: {
          transition: 'slide'
        }, 
      }, 
    
  ],
  // scrollBehavior(to, from, savedPosition) {
  //   // 始终在元素 #main 上方滚动 10px
  //   return {
  //     // 也可以这么写
  //     // el: document.getElementById('main'),
  //     el: '#scrollTitle',
  //     // 在元素上 10 像素
  //     top: 10,
  //   }
  // },
})

export default router
