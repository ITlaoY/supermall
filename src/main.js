import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'

import Fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'

import toast from './components/common/toast/index'
Vue.config.productionTip = false
//添加事件总线
Vue.prototype.$bus = new Vue()
//安装toast插件
Vue.use(toast)
//解决移动端300ms延迟
Fastclick.attach(document.body)
//懒加载
Vue.use(VueLazyload, {
  loading: require('./assets/img/common/placeholder.png')
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
