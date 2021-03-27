import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue } from 'bootstrap-vue'

import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './../node_modules/bootstrap-vue/dist/bootstrap-vue.css'
import './../node_modules/@fortawesome/fontawesome-free/css/all.min.css';

Vue.config.productionTip = false

Vue.use(BootstrapVue)

new Vue({
  render: h => h(App),
}).$mount('#app')
