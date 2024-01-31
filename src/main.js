// is this how i import the components?

import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';
import axios from 'axios';

// Import your Vue components here
// import YourComponent from './components/YourComponent.vue';
import Dashboard from './components/Dashboard.vue';

// Define your routes here
const routes = [
    { path: '/components', component: Dashboard },
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
