<template>
  <div class="indexChanges">
    <ul>
      <li v-for="(indexChange, index) in indexChanges" :key="index">
        {{ indexChange.symbol }} {{ indexChange.change }}
      </li>
    </ul>
  </div>

  <Navbar />
  <div class="dashBoard">
    <div class="fetch">
      <fetch @data-fetched="handleDataFetched" />
    </div>
    <div>
      <table-component :income-and-metrics="incomeAndMetrics" />
    </div>
  </div>
</template>
  
<script>
import axios from 'axios';
import Fetch from './fetch.vue';
import TableComponent from './table.vue';
import Navbar from './navbar.vue';

export default {
  name: 'Home',
  components: {
    Fetch,
    TableComponent,
    Navbar
  },
  // the fetchIndex should fetch all items in the indexList
  data() {
    return {
      incomeAndMetrics: [],

      indexChanges: [], // Use an array to store objects with index data
      indexList: ['^OMXS30', '^NDX', '^SPX', '^DJSH'] //  indexes Stockholm, Dow Jones, Nasdaq, S&P 500, Dow Jones Shanghai
    };
  },

  methods: {
    handleDataFetched(data) {
      this.incomeAndMetrics = data;
      console.log(this.incomeAndMetrics, 'incomeAndMetrics: dashboard.vue'); // in Dashboard.vue this currently logs the right data from fetch.vue thto the console but still no table is displayed
    },
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
          formattedIndexChanges.push({ symbol: data.symbol.slice(1), change: changesPercentage + '%' });
        }

        // Update the Vue data property
        this.indexChanges = formattedIndexChanges;

      } catch (error) {
        console.error("Error fetching data:", error);
      }
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
body {
    background-color: var(--main-bg-color);
    color: var(--main-text-color);
}

.dashBoard-header {
    height: 2rem;
    margin: 1rem;
}

.dashBoard-header h4 {
    padding: 0;
}

.dashBoard {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: nowrap;
    flex-direction: column;
    padding: 20px;
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
.indexChanges {
    display: flex;
    justify-content: center;
    align-items: center;

}

/* Logo Styles */

* {

  box-sizing: border-box;
}

body {
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
  
  
  