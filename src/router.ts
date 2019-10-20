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
      name: 'login',
      component: () =>
        import(/* webpackChunkName: "views-llgin" */ './views/Login.vue'),
    },
    {
      path: '/home',
      name: 'home',
      component: () =>
        import(/* webpackChunkName: "views-home" */ './views/Home.vue'),
    },
  ],
})
