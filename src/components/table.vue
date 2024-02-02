
<!-- i want to populate the html table once the incomeAndMetrics is updated from the fetch component -->


<template>
  <div class="table-container" @click="toggleTable">
    <table class="table">
      <caption>Table</caption>
      <thead>
        <tr>
          <th>Nyckel tal</th>
          <th v-for="data in incomeAndMetrics" :key="data.date">
            {{ data.symbol }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(value, key) in incomeAndMetrics[0]" :key="key" v-show="!isMinimized || index === 0">
          <td>{{ key.toUpperCase() }}</td>
          <td v-for="data in incomeAndMetrics" :key="data.date + key">
            {{ formatNumber(data[key]) }}
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Buttons here -->
  </div>
  <button @click="addToLocalStorage()">ADD TO LOCAL</button>
  <button @click="removeFromLocalStorage()">REMOVE LOCAL</button>
</template>


<script>

import { EventBus } from '../event-bus.js';
export default {
  name: 'table',
  data() {
    return {
      isMinimized: true,
      incomeAndMetrics: [],
    };
  },
  methods: {
    toggleTable() {
      this.isMinimized = !this.isMinimized;
    },
    addToLocalStorage(stockData) {
      let savedStocks = JSON.parse(localStorage.getItem('savedStocks')) || [];
      savedStocks.push(this.incomeAndMetrics);
      localStorage.setItem('savedStocks', JSON.stringify(savedStocks));
    },
    removeFromLocalStorage(index) {
      let savedStocks = JSON.parse(localStorage.getItem('savedStocks')) || [];
      savedStocks.splice(index, 1);
      localStorage.setItem('savedStocks', JSON.stringify(savedStocks));
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
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Arial', sans-serif;
  background-color: #f5f5f5;
  color: #333;
}

body {
  background-color: #f5f5f5;
  color: #f5f5f5;
  font-size: 16px;
  line-height: 1.6;
  padding: 20px;
}

.table-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-x: auto;
  margin: 20px 0;
}

.table-container {
  cursor: pointer;
  /* Indicates the table is clickable */
}

.table {
  border-collapse: collapse;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.table th,
.table td {
  max-width: 200px;
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.table th {
  background-color: #3a99ff;
  color: #ffffff;
  font-weight: bold;
}

.table tr:nth-child(even) {
  background-color: #e5e5e5;
}

.table tr:hover {
  background-color: #ddd;
}

.table td {
  font-weight: normal;
}

/* Additional Styling */
.table-header {
  background-color: #007bff;
  color: #ffffff;
}

.table-header th {
  font-size: 18px;
}

.highlight {
  color: #0056b3;
  font-weight: bold;
}
</style>
