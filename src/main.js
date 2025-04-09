import { createApp } from 'vue';
import router from './router';
import App from './App.vue';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

createApp(App)
    .use(router)
    .use(store)
    .mount('#app')
