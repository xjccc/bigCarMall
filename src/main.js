// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import ga from 'vue-ga'
import mixins from './mixins/mixins'
import Toast from '@/plugins/ShowToast'
import { Loading } from './loading/index'

Vue.component(Loading.name, Loading)
Vue.mixin(mixins)
Vue.use(Toast)
Vue.config.productionTip = false

const device = {
  m: 2,
  android: 5,
  iphone: 6,
  wechat: 8
}
const UA = navigator.userAgent
const IPHONE = /iPhone|iPad|iPod/i.test(UA)
const ANDROID = /android/i.test(UA)
const APP = /360che/i.test(UA)
const WECHAT = /MicroMessenger/i.test(UA)

const n = ua => {
  if (IPHONE || ANDROID) {
    if (APP) {
      // 客户端
      ua = IPHONE ? device['iphone'] : device['android']
      return ua
    } else {
      // 微信，QQ，手机站
      ua = WECHAT ? device['wechat'] : device['m']
      return ua
    }
  }
}

ga(router, `UA-64002767-${n()}`)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
