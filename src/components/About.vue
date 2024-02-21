<template>
  <Navbar />

  <div class="content">
    <div class="markdown">
      <h6>Partially chat gpt generated</h6>
      <h1>Stock Application in Vue</h1>

      <h2>Introduction</h2>
      <p>This Vue application aims to deliver real-time stock market data efficiently. While leveraging Vue.js alongside
        modern web development practices, it ensures a responsive and engaging user experience. The integration with the
        Financial Modeling Prep API facilitates access to a broad spectrum of financial data, enhancing the application's
        utility.</p>
      <p>The debate between using frameworks like Vue.js versus vanilla JavaScript centers on the trade-offs between
        abstraction and simplicity. Vue.js provides an abstraction layer that simplifies development, especially for
        complex features. However, this abstraction can sometimes obscure the underlying mechanics, potentially
        complicating debugging and customization. It's crucial to balance these aspects to avoid getting lost in
        abstraction layers.</p>
      <p>Advocating for server-side state management suggests a preference for a more traditional web application
        architecture, where the server dictates the application's state. This approach can simplify the application's
        structure but may limit the dynamic interactivity offered by client-side frameworks. A simpler application, such
        as this stock tracker, might benefit more from the direct, lean approach of vanilla JavaScript, emphasizing
        performance and straightforwardness over the advanced features of a framework.</p>

      <h2>Core Components</h2>
      <h3>Home Component (<code>Home.vue</code>)</h3>
      <p>The Home component, acting as the portal to the stock market overview, melds various functionalities into a
        unified user experience. It's the first touchpoint for users, designed to present market data succinctly.</p>

      <h3>Data Fetching Component (<code>Fetch.vue</code>)</h3>
      <p>Responsible for the seamless retrieval of stock data, the Fetch component uses the Financial Modeling Prep API to
        gather information. It showcases the asynchronous nature of web requests, ensuring the application's
        responsiveness. The component enhances data readability by processing and presenting it in a user-friendly manner.
      </p>

      <h3>Chart Component (<code>StockChart.vue</code>)</h3>
      <p>Visual representation of stock data is handled by the StockChart component, which renders interactive charts
        based on the fetched data, offering users a graphical analysis of stock performance.</p>

      <h3>Data Presentation Component (<code>Table.vue</code>)</h3>
      <p>For detailed analysis, the Table component organizes stock data into comprehensive tables. It facilitates a
        deeper understanding of market trends, enabling users to make informed decisions based on historical data.</p>

      <h2>Application Workflow</h2>
      <ol>
        <li><strong>Initialization:</strong> The Home component welcomes users, setting the stage for their exploration of
          the stock market.</li>
        <li><strong>Data Fetching:</strong> Real-time data is fetched by the Fetch component using axios, ensuring the
          information is current and relevant.</li>
        <li><strong>Data Display:</strong> Fetched data is then displayed through the Table component, allowing for
          thorough analysis and insight and also save stocks to local storage and redirect the user to the chart for that
          stock.</li>
      </ol>

      <h2>Features and Functionality</h2>
      <ul>
        <li><strong>Real-Time Data:</strong> Users receive the latest updates on stock movements and market trends,
          facilitating timely investment decisions.</li>
        <li><strong>Interactive Data Presentation:</strong> The application's interactive elements enable users to
          customize their data view, enhancing user engagement.</li>
        <li><strong>Responsive Design:</strong> With its responsive design, the application ensures a seamless experience
          across different devices and screen sizes.</li>
      </ul>

      <h2>Reflection</h2>
      <p>While this application was fun to make there is a lot of functionallity i want to add</p>
      <ol>
        <li><strong>Comparison functionallity: </strong>Compair the reports to eachother to get a vissual representation
          of how the company have performed over previos years</li>
        <li><strong>Comparison functionallity: </strong>Compairing company to its competitor companys</li>
        <li><strong>Filter functionallity: </strong>Let the user select a value or range for a accepted value per key
          metric and fetch all the reports that have these accepted values</li>
      </ol>

      <h2>Conclusion</h2>
      <p>While the Vue Stock Application showcases the potential of using Vue.js for developing dynamic web applications,
        it also prompts a reflection on the suitability of frameworks for simpler projects. The direct and lightweight
        approach of vanilla JavaScript might offer a more streamlined and efficient solution for applications with limited
        complexity, emphasizing the importance of selecting the right tool for the task at hand.</p>
      <h6>Partially generated by chat GPT due to time constraint see overview.md for what i wrote :)</h6>
    </div>
  </div>
</template>
  
<script>
import Navbar from './navbar.vue';

export default {
  name: 'About',
  components: {
    Navbar
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
}
</script>
  

<style scoped>
.content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: var(--main-text-color);
}

.markdown {
  padding: 20px;
  margin: 5rem;
  text-align: left;
  border-radius: 10px;
  width: 40%;
  background-color: var(--navbar-bg-color);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.156);
}

.markdown h1,
.markdown h2,
.markdown h3 {
  color: var(--main-text-color);
  margin: 1.5rem 0;
  line-height: normal;
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
  color: var(--main-text-color);
  text-decoration: none;
}
.markdown code {
  background-color: #00000042;
  padding: 0.1rem 0.2rem;
  border-radius: 4px;
  color: var(--main-text-color);
}
.markdown a:hover {
  text-decoration: underline;
}

@media screen and (max-width: 700px) {
  * {
    margin: 0;
    padding: 0;
  }

  .content {
    width: 100%;
  }
  .markdown {
    padding: 10px;
    text-align: left;
    border-radius: 10px;
    width: 100%;
    background-color: var(--navbar-bg-color);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin: 10px;
  }
}</style>
