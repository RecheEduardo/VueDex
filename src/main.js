import { createApp } from 'vue';
import router from './router'; // gerenciador de rotas
import App from './App.vue';
import store from './store'; // state manager com vueX
import i18n from './i18n' // internacionalização

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

createApp(App)
    .use(router)
    .use(store)
    .use(i18n)
    .mount('#app')
