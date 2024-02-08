<template>
  {{ indexChange }}
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


  </header>
  <div>
    <dashboard />
  </div>
</template>

<script>
import Dashboard from './components/Dashboard.vue';
import fetch from './components/fetch.vue'
import axios from 'axios';


export default {
  name: 'App',
  components: {
    fetch,
    Dashboard
  },
  data() {
    return {
      indexChange: '', // this will hold the value from Fetch.vue
      indexList: ['^OMXS30', '^W2DOW']
    };
  },
  methods: {

    async fetchIndex() {
      try {
        let indexChange = '';
        for (const index of this.indexList) {
          const response = await axios.get(`https://financialmodelingprep.com/api/v3/quote/${index}?apikey=1z3Eat6B3MbUU0ayvXDBXEt4D82W1Zmo`);
          let data = response.data[0];
          // structure of the response [{...}]
          if (data.change > 0) {
            data.change = '+' + data.change;
          }
          indexChange += data.change + ' ' + data.symbol.slice(1) + ' ';
          console.log(indexChange, 'indexChange');
        }
        this.indexChange = indexChange.trim();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },


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
    this.fetchIndex();
  }
};
</script>

<style scoped>
.index-con {
  display: flex;
  align-items: center;
  gap: 4px;

}

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

.index-symbol {
  margin-right: 18px;
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


