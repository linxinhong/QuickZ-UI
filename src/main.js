import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import Vuex from 'vuex'
import { router } from './router'
import store from './store/store'

Vue.config.productionTip = false

Vue.use(Antd)
Vue.use(Vuex)
Vue.use(VueQuillEditor)

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')