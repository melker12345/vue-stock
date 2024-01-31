<template>
  <div>
    <router-view></router-view>
    <h1>Dashboard</h1>
    <dashboard />
  </div>
</template>

<script>
import Dashboard from './components/Dashboard.vue';

export default {
  name: 'App',
  components: {
    Dashboard
  },
  methods: {
    callFetchMethod() {
      this.$refs.fetchComponent.fetchAndDisplayData();
    }
  },
  data() {
    return {
      ticker: ''
    };
  }
};
</script>

<style>
/* CSS styles */
</style>
