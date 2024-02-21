
<template>
  <div id="app">
    <router-view></router-view>
    
  </div>
</template>


<script>
import Home from 'C:/Users/Melker-Desktop/Desktop/skola/vue/project/my-vue-app/src/components/Home.vue';
import Navbar from './components/navbar.vue'; 

export default {
  name: 'App',
  components: {
    Home,
    Navbar
  }
}
</script>
