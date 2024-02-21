import { createRouter, createWebHistory } from 'vue-router';
import Home from '../src/components/Home.vue';
import About from '../src/components/About.vue';
import StockChart from '../src/components/StockChart.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/chart/:symbol',
    name: 'StockChart',
    component: StockChart,
    props: true, // Allows the :symbol parameter to be passed as a prop to the component
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;