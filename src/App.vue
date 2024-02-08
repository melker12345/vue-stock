<template>
  <header class="navbar">
    <div>
      <button id="theme-toggle" @click="toggleTheme()">◑</button>
    </div>

    <div class="nav-links">
      <button class="nav-button">
        Chart
      </button>
      <button class="nav-button">
        Financial
      </button>
    </div>

    <div class="nav-logo">
      
      <div class="index-con">
        <div class="high">
          <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" id="up-arrow">
            <path
              d="M17.71,11.29l-5-5a1,1,0,0,0-.33-.21,1,1,0,0,0-.76,0,1,1,0,0,0-.33.21l-5,5a1,1,0,0,0,1.42,1.42L11,9.41V17a1,1,0,0,0,2,0V9.41l3.29,3.3a1,1,0,0,0,1.42,0A1,1,0,0,0,17.71,11.29Z">
            </path>
          </svg>
          <p>1.23%</p>
        </div>
  
        <div class="low">
        <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" id="down-arrow">
          <path
            d="M17.71,11.29a1,1,0,0,0-1.42,0L13,14.59V7a1,1,0,0,0-2,0v7.59l-3.29-3.3a1,1,0,0,0-1.42,1.42l5,5a1,1,0,0,0,.33.21.94.94,0,0,0,.76,0,1,1,0,0,0,.33-.21l5-5A1,1,0,0,0,17.71,11.29Z">
          </path>
        </svg>
        <p>3.31%</p>
      </div>


      </div>
<!--     
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6">
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
          <polyline points="16 7 22 7 22 13"></polyline>
        </svg> -->
        <span class="font-semibold">OMX</span>
    
    </div>
  </header>
  <div>

    <router-view></router-view>
    <dashboard />
  </div>
</template>

<style scoped>

.high {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  text-align: center;
  margin-right: 16px;
  color: #00ff00;
}

.low {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  text-align: center;
  color: #ff0000;
  margin-right: 16px;
}


* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background-color: var(--main-bg-color);
  color: var(--main-text-color);
}

/* Navbar Styles */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: var(--navbar-bg-color);
  color: var(--navbar-text-color);
}

/* Navigation Links */
.nav-links {
  display: flex;
  gap: 20px;
}

/* Navigation Buttons */
.nav-button {
  padding: 10px 20px;
  background-color: var(--button-bg-color);
  color: var(--button-text-color);
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
}

.nav-button:hover {
  background-color: var(--button-hover-bg-color);
  color: var(--button-hover-text-color);
}

/* Logo Styles */
.nav-logo {
  display: flex;
  align-items: center;
}

.nav-logo a {
  text-decoration: none;
  display: flex;
  align-items: center;
  color: var(--navbar-text-color);
}

.nav-logo svg {
  margin-right: 10px;
}

/* Theme Toggle Button */
#theme-toggle {
  background-color: var(--bg-color);
  color: var(--text-color);
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
  font-size: 32px;
}

#theme-toggle:hover {
  background-color: var(--main-bg-color);
  color: var(--main-text-color);
}

/* SVG Icon Styles */
svg {
  width: 24px;
  height: 24px;
}


</style>



<script>
import Dashboard from './components/Dashboard.vue';

export default {
  name: 'App',
  components: {
    Dashboard
  },
  methods: {
    toggleTheme() {
      const currentTheme = document.body.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.body.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    },
    checkTheme() {
      const currentTheme = localStorage.getItem('theme') || 'light';
      document.body.setAttribute('data-theme', currentTheme);
    }
  },
  mounted() {
    this.checkTheme();
  }
};
</script>
