<template>
    <div class="indexChanges">
      <ul>
        <li v-for="(indexChange, index) in indexChanges" :key="index">
          {{ indexChange.symbol }} {{ indexChange.change }}
        </li>
      </ul>
    </div>
    <header class="navbar">
      <div>
        <button id="theme-toggle" @click="toggleTheme()">◑</button>
      </div>
  
        <ul class="nav-button">
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/about">About</router-link></li>
          <!-- Add more navigation links here -->
        </ul>
    </header>
  
    <div>
      <dashboard />
    </div>
  </template>
  
  <script> 
  import Dashboard from './Dashboard.vue';
  import axios from 'axios';
  
  
  export default {
    name: 'Home',
    components: {
      fetch,
      Dashboard
    },
    // the fetchIndex should fetch all items in the indexList
    data() {
      return {
        indexChanges: [], // Use an array to store objects with index data
        indexList: ['^OMXS30', '^W2DOW', '^W5000', '^SET.BK', '^HSCE'] // max 5 index
      };
    },
  
    methods: {
      async fetchIndex() {
        try {
          // Initialize an empty array to store the formatted data
          const formattedIndexChanges = [];
  
          for (const index of this.indexList) {
            const response = await axios.get(`https://financialmodelingprep.com/api/v3/quote/${index}?apikey=1z3Eat6B3MbUU0ayvXDBXEt4D82W1Zmo`);
            let data = response.data[0];
            let changesPercentage = data.changesPercentage.toFixed(2);
  
            // Prepend a plus sign for positive changes
            if (changesPercentage > 0) {
              changesPercentage = '+' + changesPercentage;
            }
  
            // Push an object with both symbol and formatted change percentage
            formattedIndexChanges.push({
              symbol: data.symbol.slice(1), // Remove the '^' from the symbol
              change: changesPercentage + '%'
            });
          }
  
          // Update the Vue data property
          this.indexChanges = formattedIndexChanges;
  
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
    width: fit-content;
    display: flex;
    gap: 20px;
  }
  
  /* Navigation Buttons */
  .nav-button {
    display: flex;
    gap: 20px;
    list-style: none;
    padding: 0;
    margin: 0;
    color: var(--navbar-text-color)
    
  }
  
  .nav-button li {
  
    width: fit-content;
    padding: 10px 20px;
    background-color: var(--button-bg-color);
    color: var(--button-text-color);
    border: none;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s, color 0.3s;
  }
  .nav-button li a{
    width: fit;
    text-decoration: none;
    color: var(--button-text-color);
  }
  
  .nav-button:hover {
    background-color: var(--button-hover-bg-color);
    color: var(--button-hover-text-color);
  }
  .indexChanges {
    display: flex;
    justify-content: center;
    align-items: center;
  
  }
  
  .indexChanges>ul {
    display: flex;
    width: 40%;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
  }
  
  .indexChanges>ul>li {
    display: flex;
    margin: 8px;
    text-align: center;
    align-items: center;
    justify-content: center;
  
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
    font-family: inherit, sans-serif;
    background-color: var(--main-bg-color);
    color: var(--main-text-color);
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
  
  @media screen and (max-width: 1500px) {
    .indexChanges>ul {
      display: flex;
      width: 100%;
      justify-content: center;
      align-items: center;
      flex-wrap: nowrap;
    }
  }
  
  @media screen and (max-width: 700px) {
    .indexChanges>ul {
      display: flex;
      width: 100%;
      justify-content: center;
      align-items: center;
  
    }
  
    .indexChanges>ul>li {
      display: flex;
      margin: 8px;
      background-color: var(--navbar-bg-color);
      border-radius: 5px;
      font-size: 12px;
      color: var(--navbar-text-color);
    }
  }
  </style>
  
  
  