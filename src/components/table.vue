
<!-- i want to populate the html table once the incomeAndMetrics is updated from the fetch component -->
<template>
  <h1>table</h1>
  <div class="table" v-if="incomeAndMetrics.length > 0">
    <table>
      <thead>
        <tr>
          <th>Nyckel tal</th>
          <th v-for="data in incomeAndMetrics" :key="data.date">
            {{ data.symbol }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(value, key) in incomeAndMetrics[0]" :key="key">
          <td>{{ key.toUpperCase() }}</td>
          <td v-for="data in incomeAndMetrics" :key="data.date + key">
            {{ formatNumber(data[key]) }}
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Buttons here -->
  </div>
</template>


<script>

// incomeAndMetrics recives Data received from EventBus, the structure of this array is [ { symbol: 'AAPL', date: '2020-12-31', ... }, { symbol: 'AAPL', date: '2019-12-31', ... }, ... ]
// i want the keys of the first object in the array to be in the let most column in the HTML,
// and the column to the right should consist of the values of the first object in the array
// the next column should consist of the values of the second object in the array
import { EventBus } from '../event-bus.js';
export default {
  name: 'table',
  data() {
    return {
      incomeAndMetrics: [],
    };
  },
  methods: {
    addToLocalStorage(stockData) {
      let savedStocks = JSON.parse(localStorage.getItem('savedStocks')) || [];
      savedStocks.push(stockData);
      localStorage.setItem('savedStocks', JSON.stringify(savedStocks));

    },
    removeFromLocalStorage(index) {
      this.combinedData.splice(index, 1);
      localStorage.setItem(
        "savedStocks",
        JSON.stringify(this.combinedData)
      );
    },
    formatNumber(value, currency) {
      currency = this.incomeAndMetrics[0].reportedCurrency;
      if (typeof value === "number") {
        if (value >= 1000000) {
          return (
            (value / 1e6).toFixed(0) + " M " + currency
          );
        }
        if (value <= -1000000) {
          return (
            (value / 1e6).toFixed(0) + " M " + currency
          );
        }
        return value.toFixed(2).toLocaleString();
      } else {
        return value;
      }
    },
  },
  computed: {
    formattedIncomeAndMetrics() {
      return JSON.stringify(this.incomeAndMetrics, null, 2); // Pretty print the array
    }
  },
  watch: {
    incomeAndMetrics(newVal) {
      console.log("incomeAndMetrics changed:", newVal);
    }
  },
  created() {
    EventBus.on('incomeAndMetricsChanged', (data) => {
      this.incomeAndMetrics = data;
      console.log(this.incomeAndMetrics, 'from table.vue'); // Corrected log statement
    });
  },
  beforeUnmount() {
    // Clean up the event listener, specify the function if necessary
    EventBus.off('incomeAndMetricsChanged', this.someFunction); // 'this.someFunction' should be the same function used in EventBus.on
  }
};
</script>

<style scoped>
* {
    color: #fff;
    --background-color: rgb(11, 20, 25);
    --primary-color: #414141;
    --secondary-color: #333;
    --tertiary-color: #343434;
    --text-color: #fff;
    --border-color: #000000;
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
    font-family: 'Inter', sans-serif;
    font-size: 16px;
}
* {
  max-width: 100%;
}
table {
    box-sizing: border-box;
    background-color: var(--primary-color);
    color: var(--text-color);
    max-width: 100vw;
    height: fit-content;
    width: 100%;
}
.table {
    display: flex;
    width: fit-content;
    max-width: 90vw;
    padding: 10px;
    font-size: smaller;
    font-family: inter;
}
th {
    border: 1px solid var(--border-color);
    padding: 5px;
    height: fit-content;
    color: rgb(255, 255, 255);
    text-align: center;
}

td {
    border: 1px solid var(--border-color);
    box-sizing: border-box;
    height: fit-content;
    width: fit-content;
    text-align: center;
    padding: 0;
    margin: 0;
}
td:nth-child(1) {
    width: 200px;
    text-align: left;
}

td:nth-child(even) {
    background: var(--primary-color);
    color: var(--text-color);
}

td:nth-child(odd) {
    background: var(--tertiary-color);
    color: var(--text-color);
}

</style>
