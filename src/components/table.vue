<template>
<div>
    <div class="stock-table-container" v-for="(stockList, index) in stocks" :key="index">
      <div class="responsive-table">
        <div class="btn-con">
          <button @click="toggleTable(stockList[0].Symbol)">
            {{ isMinimized[stockList[0].Symbol] ? 'Maximize' : 'Minimize' }}
          </button>
          <button @click="addToLocalStorage(stockList[0])">ADD TO LOCAL</button>
          <button @click="removeFromLocalStorage(index)">REMOVE LOCAL</button>
        </div>

        <!-- Minimized version of the table -->
        <table v-if="isMinimized[stockList[0].Symbol]" class="stock-table-minimized">
          <thead>
            <tr>
              <th>{{ stockList[0].Symbol }}</th>
              <th>peRatio</th>
              <th>debtToEquity</th>
              <th>dividendYield</th>
              <th>revenue</th>
              <th>payoutRatio</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>  </td>
              <td>{{ formatNumber(stockList[0].peRatio) }}</td>
              <td>{{ formatNumber(stockList[0].debtToEquity) }}</td>
              <td>{{ formatNumber(stockList[0].dividendYield) }}</td>
              <td>{{ formatNumber(stockList[0].revenue) }}</td>
              <td>{{ formatNumber(stockList[0].payoutRatio) }}</td>
            </tr>
          </tbody>
        </table>

        <!-- Maximized version of the table -->

        <table v-else>
          <thead>
            <tr>
              <th>Last 5 reports for {{ stockList[0].Symbol }}</th>
              <th v-for="report in stockList" :key="report.Date">
                {{ report.Date }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>

            </tr>
            <tr v-for="(value, key) in stockList[0]" :key="key">
              <td>{{ key }}</td>
              <td v-for="(report, reportIndex) in stockList" :key="reportIndex">
                {{ formatNumber(report[key]) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, toRefs, computed } from 'vue';

export default {
  name: 'TableComponent',
  props: {
    incomeAndMetrics: Array,
  },
  setup(props) {
    
    // Setup reactive state
    const state = reactive({
      isMinimized: {},
      // Computed property to transform props.incomeAndMetrics into a reactive stocks array
      stocks: computed(() => props.incomeAndMetrics.map(stock => ({
        ...stock, // Spread operator to copy properties from each stock object
        // You can add additional transformations or computed properties for each stock here
      }))),
     
    });

    // Function to toggle the visibility of a table based on its stock symbol
    function toggleTable(symbol) {
      if (state.isMinimized[symbol] === undefined) {
        // Initialize as false if it doesn't exist
        state.isMinimized[symbol] = false;
      }
      state.isMinimized[symbol] = !state.isMinimized[symbol];
    }

    // Function to add a stock to localStorage
    function addToLocalStorage(stock) {
      let savedStocks = JSON.parse(localStorage.getItem('savedStocks')) || [];
      savedStocks.push(stock);
      localStorage.setItem('savedStocks', JSON.stringify(savedStocks));
    }

    // Function to remove a stock from localStorage by index
    function removeFromLocalStorage(index) {
      let savedStocks = JSON.parse(localStorage.getItem('savedStocks')) || [];
      if (index >= 0 && index < savedStocks.length) {
        savedStocks.splice(index, 1);
        localStorage.setItem('savedStocks', JSON.stringify(savedStocks));
      }
    }

    // Function to format numbers, optionally adding a currency symbol
    function formatNumber(value, currency = '') {
      if (typeof value === 'number') {
        if (Math.abs(value) >= 1000000) {
          return `${(value / 1e6).toFixed(2)}M ${currency}`;
        }
        return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ` ${currency}`;
      }
      return value;
    }

    // Return reactive state and methods to the template
    return {
      ...toRefs(state), // Convert the reactive state to refs for use in the template
      toggleTable,
      addToLocalStorage,
      removeFromLocalStorage,
      formatNumber,
    };
  },
};
</script>


<!-- table.vue -->
<style scoped>
.responsive-table {
  overflow-x: auto;
  /* Allows table to scroll horizontally when necessary */
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: var(--main-bg-color);
  color: var(--main-text-color);
  border-collapse: collapse;
}

.stock-table-container {
  overflow-x: auto;
}

.stock-table {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  margin: auto;

}

thead {
  width: 100%;
}

th {
  max-width: 225px;
  width: fit-content;
  padding: 8px;
  text-align: center;
  border: 1px solid black;
}

td {
  max-width: 225px;
  padding: 8px;
  text-align: center;
  border: 1px solid black;
}

.stock-table td:first-child {
  font-weight: bold;
}


button {
  margin: 20px;
  padding: 10px 15px;
  background-color: var(--button-bg-color);
  color: var(--button-text-color);
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;

}

button:nth-child(1) {
  margin: 0;
}

button:nth-last-child(1) {
  margin: 0;
}

@media (max-width: 600px) {

  th,
  td {
    display: block;
    text-align: right;
  }

  td::before {
    /* Display the content of the "data-label" attribute as a pseudo-element before each cell */
    content: attr(data-label);
    float: left;
    font-weight: bold;
  }

  /* Adjustments for smaller screens */
  .responsive-table {
    overflow-y: hidden;
  }
}
</style>

