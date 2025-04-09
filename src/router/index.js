// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Detail from '@/views/Detail.vue';

const routes = [ // rotas do app
  { path: '/', name: 'Home', component: Home },
  // props: true permite o uso do id na url
  { path: '/pokemon/:id', name: 'Detail', component: Detail, props: true }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
