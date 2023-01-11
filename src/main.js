import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import Axios from './axios'

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'
import './assets/css/bootstrap-override.css'
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

import { ServerTable, ClientTable, Event } from 'vue-tables-2';
Vue.use(ClientTable, {}, false, 'bootstrap4', {});

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');