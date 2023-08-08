import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router/index';
import { VueQueryPlugin, VueQueryPluginOptions } from 'vue-query';

const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: { queries: { staleTime: 1000 * 60 * 5 } },
  },
};

createApp(App)
  .use(VueQueryPlugin, vueQueryPluginOptions)
  .use(router)
  .mount('#app');
