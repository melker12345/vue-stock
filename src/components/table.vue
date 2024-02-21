<template>
  <div>
    <div class="stock-table-container" v-for="(stockList, index) in stocks" :key="index">
      <div class="responsive-table">
        <div class="btn-con">
          <button @click="toggleTable(stockList[0].Symbol)" :aria-label="'Toggle ' + stockList[0].Symbol + ' Table'">
            {{ isMinimized[stockList[0].Symbol] ? 'Maximize' : 'Minimize' }}
          </button>
          <button @click="addToLocalStorage(stockList)"
            :aria-label="'Add ' + stockList[0].Symbol + ' to Local Storage'">Add to Local</button>
          <button @click="removeFromLocalStorage(stockList[0].Symbol)"
            :aria-label="'Remove ' + stockList[0].Symbol + ' from Local Storage'">Remove Local</button>
        </div>

        <!-- Minimized version of the table -->
        <table v-if="isMinimized[stockList[0].Symbol]" class="stock-table-minimized">
          <thead>
            <tr>
              <th>{{ stockList[0].Symbol }}</th>
              <th>PE Ratio</th>
              <th>Debt To Equity</th>
              <th>Dividend Yield</th>
              <th>Revenue</th>
              <th>Payout Ratio</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ stockList[0].Date }}</td>
              <td>{{ formatNumber(stockList[0].PeRatio) }}</td>
              <td>{{ formatNumber(stockList[0].DebtToEquity) }}</td>
              <td>{{ formatNumber(stockList[0].DividendYield) }}</td>
              <td>{{ formatNumber(stockList[0].Revenue) }}</td>
              <td>{{ formatNumber(stockList[0].PayoutRatio) }}</td>
            </tr>
          </tbody>
        </table>

        <!-- Maximized version of the table -->
        <table v-else>
          <thead>
            <tr>
              <th>{{ stockList[0].Symbol }}</th>
              <th v-for="report in stockList" :key="report.Date">{{ report.Date }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(value, key) in stockList[0]" :key="key">
              <td>{{ key }}</td>
              <td v-for="report in stockList" :key="report.Date">{{ formatNumber(report[key]) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, watch, onMounted } from 'vue';

export default {
  name: 'TableComponent',
  props: {
    incomeAndMetrics: Array,
  },
  setup(props) {
    const state = reactive({
      isMinimized: {},
      stocks: [], // Initialize as an empty array
    });

    function mergeStocks() {
      const savedStocks = JSON.parse(localStorage.getItem('savedStocks')) || [];
      const propStocks = props.incomeAndMetrics;
      const merged = [...savedStocks];

      propStocks.forEach(stockList => {
        const symbol = stockList[0]?.Symbol;
        if (!merged.some(stock => stock[0]?.Symbol === symbol)) {
          merged.push(stockList);
        }
      });

      state.stocks = merged;
    }

    // Watcher for props.incomeAndMetrics to handle updates
    watch(() => props.incomeAndMetrics, (newValue, oldValue) => {
      if (newValue !== oldValue) {
        mergeStocks();
      }
    }, { deep: true, immediate: true });

    // Load stocks from localStorage and merge with props on mount
    onMounted(() => {
      mergeStocks();
    });

    function toggleTable(symbol) {
      state.isMinimized[symbol] = !state.isMinimized[symbol];
    }

    function addToLocalStorage(stockList) {
      try {
        let savedStocks = JSON.parse(localStorage.getItem('savedStocks')) || [];
        // Check if the stock is already in localStorage to prevent duplicates
        if (!savedStocks.some(stock => stock[0].Symbol === stockList[0].Symbol)) {
          savedStocks.push(stockList);
          localStorage.setItem('savedStocks', JSON.stringify(savedStocks));
        }
      } catch (e) {
        console.error('Error saving to localStorage', e);
      }
    }

    function removeFromLocalStorage(symbol) {
      try {
        let savedStocks = JSON.parse(localStorage.getItem('savedStocks')) || [];
        savedStocks = savedStocks.filter(stock => stock[0].Symbol !== symbol);
        localStorage.setItem('savedStocks', JSON.stringify(savedStocks));
        // Refresh the stocks displayed to reflect the removal
        mergeStocks(); // Corrected to call mergeStocks
      } catch (e) {
        console.error('Error removing from localStorage', e);
      }
    }

    function formatNumber(value, currency = '') {
      if (typeof value === 'number') {
        if (Math.abs(value) >= 1000000) {
          return `${(value / 1e6).toFixed(2)}M ${currency}`;
        }
        return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ` ${currency}`;
      }
      return value;
    }

    return {
      ...toRefs(state),
      toggleTable,
      addToLocalStorage,
      removeFromLocalStorage,
      formatNumber,
      // Optionally expose this if you want a manual refresh mechanism
    };
  }
}
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

table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid black;

}

.stock-table-container {
  overflow-x: auto;
}

.stock-table-minimized {
  width: 775px;
}

.stock-table {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 775px;
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

