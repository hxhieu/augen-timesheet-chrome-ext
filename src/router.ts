import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      // https://stackoverflow.com/questions/44530237/use-vuerouter-and-vue-js-in-chrome-extension-issues-with-path-segments
      path: '/index.html',
      name: 'home',
      component: () =>
        import(/* webpackChunkName: "views-home" */ './views/Home.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "views-about" */ './views/About.vue'),
    },
  ],
})
