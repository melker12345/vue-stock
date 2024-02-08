import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';
import axios from 'axios';
import './style.css'; 

import Dashboard from './components/Dashboard.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/components', component: Dashboard },
  ],
});

const app = createApp(App);

app.use(router);
app.use(createPinia());
app.provide('axios', axios);

app.mount('#app');
