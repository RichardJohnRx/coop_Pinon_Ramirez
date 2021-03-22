import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import SuiVue from 'semantic-ui-vue';
import 'semantic-ui-css/semantic.min.css';

Vue.use(SuiVue);

window.api = axios.create({
  //L'URL de l'API Coop
  baseURL: 'https://allweb.fun/coop/api/',
  //On ajout le token authorization dans le header de chaque requête
  headers: { Authorization: '04e755be07aaaf9fae6a9618873b9332abefd167' }
});

Vue.config.productionTip = false

//On crée une variable nommé $bus qui va mettre à disposition
//des fonctions dans tout l'environnement de l'appli
Vue.prototype.$bus = new Vue()

new Vue({
  beforeCreate() {
    //On ajoute le token du membre connecté pour réaliser le CRUD de chaque module
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
