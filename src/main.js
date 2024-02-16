import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';
import axios from 'axios';
import './style.css'; 
import Home from './components/Home.vue'
import About from './components/About.vue'

const routes = [
  { path: '/about', component: About },
  { path: '/', component: Home },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});



const app = createApp(App);

app.use(router);
app.use(createPinia());
app.provide('axios', axios);

app.mount('#app');

export default {
  app,
  router
};
export const EventBus = app.config.globalProperties.Vue;
