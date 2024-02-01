<template>
  
  <div>
    <nav>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Users</a></li>
        <li><a href="#">User 1</a></li>
      </ul>
    </nav>
    <router-view></router-view>
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

<style scoped>
*{
  max-width: 100%;
  background-color: #0b0c0d;
  color: #dfdcd8;
}
body{
  padding: 1px;
  margin-top: 5px;
}
ul{
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  margin: 0;
  width: 100%;
  height: 100%;
}
li {
  margin: 0px;
  padding: 0;
  height: fit-content;
  width: fit-content;
  display: flex;
  align-items: center;
}

a:hover {
  border-radius: 5px;
  background-color: #1f1f1f;
}

a{
  
  font-size: x-large;
  font-weight: 700;
  text-decoration: none;
  
  height: 100%;
  margin: 0;
  padding: 10px;
}


</style>
