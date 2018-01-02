// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

// Polyfills IE-11
import "babel-polyfill";

// Global SASS Own Styles
import './styles/main.scss'

// Vuetify Material
import Vuetify from 'vuetify'
Vue.use(Vuetify);

// Axios
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios);

// Vuex Store
import { store } from './store/store'


// API Config
import ApiConfig from './config'
Vue.use(ApiConfig);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
