import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import store from './store';
import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
    store: new Vuex.Store(store),
}).$mount('#app');
