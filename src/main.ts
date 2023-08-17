import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router/index';
import { VueQueryPlugin, VueQueryPluginOptions } from '@tanstack/vue-query';

const [MILLISECOND, SECOND, MINUTE] = [1000, 60, 10];
const STALE_TIME = MILLISECOND * SECOND * MINUTE;

const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: { queries: { staleTime: STALE_TIME } },
  },
};

createApp(App)
  .use(VueQueryPlugin, vueQueryPluginOptions)
  .use(router)
  .mount('#app');
