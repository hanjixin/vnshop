// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/assets/css/app.css'
import infiniteScroll from 'vue-infinite-scroll'
import VueLazyLoad from 'vue-lazyload'
import Vueaxios from  "vue-axios"
import axios from  "axios"
import apiConfig from '../config/api.config'
Vue.use(Vueaxios,axios);
Axios.defaults.baseURL = apiConfig.baseUrl;
;
// Vue.prototype.axios = axios
Vue.use(infiniteScroll)

Vue.use(VueLazyLoad, {
  loading: '/static/img/ok-2.png' //添加默认的图片
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

var  modal=`
  <div>
<div class="modal-mask" v-show="show" transition="modal">
    <div class="modal-wrapper">
      <div class="modal-container">

        <div class="modal-header">
          <slot name="header">
            default header
          </slot>
        </div>

        <div class="modal-body">
          <slot name="body">
            default body
          </slot>
        </div>

        <div class="modal-footer">
          <slot name="footer">
            default footer
            <button class="modal-default-button"
              @click="show = false">
              OK
            </button>
          </slot>
        </div>
      </div>
    </div>
  </div>
  </div>
`
// Vue.component('modal', {
//   name:'modal',
//   template: modal,
//   props: {
//     show: {
//       type: Boolean,
//       required: true, // 必需且是bool类型的
//          // 双向绑定
//     }
//   }
// })


