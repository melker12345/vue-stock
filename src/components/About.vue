<template>
  <header class="navbar">
    <div>
      <button id="theme-toggle" @click="toggleTheme()">◑</button>
    </div>

    <ul class="nav-button">
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/about">About</router-link></li>
    </ul>
  </header>

  <div class="content">
    <div class="markdown">
      <h1>About the Vue Stock Application</h1>

      <h2>Introduction</h2>
      <p>This Vue application is designed to provide real-time stock market data to users. By utilizing the Vue.js
        framework and modern web development practices, it offers a dynamic and interactive experience. The application
        integrates the Financial Modeling Prep API to fetch a wide range of financial data.</p>

      <h2>Core Components</h2>

      <h3>Dashboard Component (<code>Dashboard.vue</code>)</h3>
      <p>The Dashboard serves as the main view of our application, where users can get an overview of the stock market at
        a glance. It integrates various functionalities and components, providing a cohesive user experience.</p>

      <h3>Data Fetching Component (<code>fetch.vue</code>)</h3>
      <p>This component is responsible for retrieving stock market data from the Financial Modeling Prep API. It
        constructs a request URL using a specific endpoint and an API key, making asynchronous web requests to ensure the
        application remains responsive while fetching the latest stock information.</p>

      <h3>Data Presentation Component (<code>table.vue</code>)</h3>
      <p>The <code>table.vue</code> component displays the fetched stock data in a structured and user-friendly table
        format. This allows users to easily understand and analyze market trends.</p>

      <h2>Application Workflow</h2>
      <ol>
        <li><strong>Initialization:</strong> Upon loading the application, the <code>Dashboard.vue</code> component is
          displayed, serving as the entry point for users.</li>
        <li><strong>Data Fetching:</strong> The <code>fetch.vue</code> component retrieves the latest stock market data
          from the Financial Modeling Prep API, ensuring users have access to up-to-date information.</li>
        <li><strong>Data Display:</strong> Once the data is fetched, it is passed to the <code>table.vue</code> component,
          which organizes and displays it in a tabular format for easy viewing and analysis.</li>
      </ol>

      <h2>Features and Functionality</h2>
      <ul>
        <li><strong>Real-Time Data:</strong> The application provides real-time updates on stock prices and market trends.
        </li>
        <li><strong>Interactive Data Presentation:</strong> Users can interact with the data presented, filtering and
          sorting according to their preferences.</li>
        <li><strong>Responsive Design:</strong> Crafted with a responsive design, the application offers an optimal
          viewing experience across various devices and screen sizes.</li>
      </ul>

      <h2>Conclusion</h2>
      <p>The Vue Stock Application exemplifies the power of Vue.js and modern web technologies in creating dynamic,
        data-driven applications. By seamlessly fetching and presenting real-time stock market data from the Financial
        Modeling Prep API, it serves as a valuable tool for investors and enthusiasts looking to stay updated with market
        trends.</p>

    </div>
  </div>
</template>
  
<script>
export default {
  name: 'About',
  data() {
    return {
      // Your data here
    };
  },
  methods: {
    // Your methods here
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
}
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

.nav-button {
  display: flex;
  gap: 20px;
  list-style: none;
  padding: 0;
  margin: 0;
  color: var(--navbar-text-color)
}

.nav-button li {
  padding: 10px 20px;
  background-color: var(--button-bg-color);
  color: var(--button-text-color);
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
}

.nav-button li a {
  text-decoration: none;
  color: var(--button-text-color);
}

.nav-button li:hover {
  background-color: var(--button-hover-bg-color);
  color: var(--button-hover-text-color);
}

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

.content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: var(--main-text-color);
}

.markdown {
  padding: 20px;
  margin: 20px;
  text-align: left;
  border-radius: 10px;
  width: 50%;
  background-color: var(--navbar-bg-color);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.markdown h1,
.markdown h2,
.markdown h3 {
  color: var(--main-text-color);
  margin: 1rem 0;
}

.markdown p {
  margin-bottom: 1rem;
}

.markdown ul {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

.markdown li {
  margin-bottom: 0.5rem;
}

.markdown a {
  color: var(--button-text-color);
  text-decoration: none;
}

.markdown a:hover {
  text-decoration: underline;
}

@media screen and (max-width: 1500px) {
  .indexChanges > ul {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
  }
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
</style>
