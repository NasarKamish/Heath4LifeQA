import Vue from 'vue';
import App from './App.vue';
import router from './route/index'
import vuetify from './plugins/vuetify';

import { store } from './store/store';

import VueMask from 'v-mask'
import VueSignature from "vue-signature-pad";
import './registerServiceWorker'

Vue.use(VueMask);
Vue.use(VueSignature);
Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
}).$mount('#app')
