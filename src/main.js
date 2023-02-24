import Vue from "vue"
import App from "./App.vue"
import vuetify from "@/plugins/vuetify"
import router from "./router";
import Vuex from 'vuex'
import store from '@/store'
// import "@/css/main.scss"
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSSE from 'vue-sse'
import i18n from '@/plugins/i18n'
import VueCookies from 'vue-cookies'
import untils from '@/utils/untils'
import api from '@/api/api'
import moment from 'moment'
import favico from '@/plugins/favico-0.3.10.min'
import VueFileAgent,{ plugins } from 'vue-file-agent'
import * as tus from 'tus-js-client'
import VuePlyr from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'
import VueFileAgentStyles from 'vue-file-agent/dist/vue-file-agent.css';
require('vue-image-lightbox/dist/vue-image-lightbox.min.css')
import VueLazyLoad from 'vue-lazyload'
import gsap from "gsap"
import 'remixicon/fonts/remixicon.css'
import VueMeta from 'vue-meta'
import vueFilter from '@/filters/index'
// Import component
import Loading from 'vue-loading-overlay';
// Import stylesheet

import 'vue-loading-overlay/dist/vue-loading.css';

// import virtualList from 'vue-virtual-scroll-list'

// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
// Make BootstrapVue available throughout your project
// Vue.prototype.$moment = moment
// plugins.tus = tus
plugins.tus = tus
gsap.registerPlugin(gsap)
Vue.use(gsap)

Vue.prototype.api = api
Vue.prototype.untils = untils
Vue.prototype.favico = favico
Vue.config.productionTip = false;
Vue.component("icon", require("./components/Post/icons").default)

// plugins.tus = tus
// Vue.use(moment)
Vue.use(VueSSE,{
  format: 'json',
  polyfill: true,
  withCredentials: true,
})
Vue.use(VueAxios, axios)
Vue.use(VueCookies)

Vue.use(VueFileAgent)
Vue.use(VuePlyr)
Vue.use(Vuex)
Vue.use(VueLazyLoad)
Vue.use(VueMeta)

Vue.use(Loading, {
  // props
  color: 'red'
},{
  // slots
})

//公共过滤器
for (let key in vueFilter) {
  Vue.filter(key,vueFilter[key])
}


// Vue.use(BootstrapVue)
// Vue.use(IconsPlugin)

new Vue({
  router,
  i18n,
  vuetify,
  store,
  render: h => h(App)
}).$mount("#app");
