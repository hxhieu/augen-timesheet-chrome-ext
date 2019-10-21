import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './element-ui'

import VueCompositionApi from '@vue/composition-api'
import VueHooks from '@u3u/vue-hooks'
import VueApexCharts from 'vue-apexcharts'

Vue.use(VueCompositionApi)
Vue.use(VueHooks)
Vue.component('apexchart', VueApexCharts)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
