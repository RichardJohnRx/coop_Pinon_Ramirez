import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import SuiVue from 'semantic-ui-vue';
import 'semantic-ui-css/semantic.min.css';

Vue.use(SuiVue);

window.api = axios.create({
  baseURL: 'https://allweb.fun/coop/api/',
  headers: { Authorization: '04e755be07aaaf9fae6a9618873b9332abefd167' }
});

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

new Vue({
  beforeCreate() {
    api.interceptors.request.use(config => {
      if (this.$store.state.token){
        config.url += '?token=' + this.$store.state.token;
      }
      return config;
    })
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
