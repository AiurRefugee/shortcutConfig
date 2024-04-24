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
  scrollBehavior(to, from, savedPosition) { 
    console.log('savedPosition', savedPosition)
    return 0
  },
})

export default router
