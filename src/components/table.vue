<template>
  <div>
    <div class="stock-table-container" v-for="(stockList, index) in stocks" :key="index">
      <div class="responsive-table">
        <button class="hamburger-btn" @click="toggleMenu" v-if="isMobile">
          &#9776; <!-- Represents the hamburger icon -->
        </button>

        <!-- Hamburger Menu Content -->
        <div v-if="menuOpen && isMobile" class="hamburger-menu">
          <button @click="toggleTable(stockList[0].Symbol)">
            {{ isMinimized[stockList[0].Symbol] ? 'Maximize' : 'Minimize' }}
          </button>
          <button @click="addToLocalStorage(stockList)">Add to Local</button>
          <button @click="removeFromLocalStorage(stockList[0].Symbol)">Remove Local</button>
          <button @click="viewChart(stockList[0].Symbol)">View Chart</button>
          <!-- Add more links or content as needed -->
        </div>
        <div class="btn-con" v-if="!isMobile">
          <button @click="toggleTable(stockList[0].Symbol)">
            {{ isMinimized[stockList[0].Symbol] ? 'Maximize' : 'Minimize' }}
          </button>
          <button @click="addToLocalStorage(stockList)">Add to Local</button>
          <button @click="removeFromLocalStorage(stockList[0].Symbol)">Remove Local</button>
          <button @click="viewChart(stockList[0].Symbol)">View Chart</button>
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
              <th v-for="report in stockList" :key="report.Date">
                {{ report.Date }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(value, key) in stockList[0]" :key="key">
              <td>{{ key }}</td>
              <td v-for="report in stockList" :key="report.Date">
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
import { reactive, computed, ref, toRefs, watch, onMounted } from 'vue';

export default {
  name: 'TableComponent',
  props: {
    incomeAndMetrics: Array,
  },
  setup(props) {
    const menuOpen = ref(false);
    const isMobile = computed(() => window.innerWidth < 768);

    function toggleMenu() {
      menuOpen.value = !menuOpen.value;
    }
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) {
        menuOpen.value = false; // Automatically close the menu on resize if the screen is larger than 768px
      }
    });
    const state = reactive({
      isMinimized: {},
      stocks: [], // Initialize as an empty array
    });

    function mergeStocks() {
      const savedStocks = JSON.parse(localStorage.getItem('savedStocks')) || [];
      const propStocks = [...props.incomeAndMetrics];

      // Ensure only unique stocks based on Symbol are merged
      const merged = [...savedStocks];
      propStocks.forEach(stockList => {
        const symbol = stockList[0]?.Symbol;
        if (!merged.some(stock => stock[0]?.Symbol === symbol)) {
          merged.push(stockList);
        }
      });

      state.stocks = merged;
    }

    watch(() => props.incomeAndMetrics, () => {
      mergeStocks();
    }, { deep: true, immediate: true });

    onMounted(() => {
      mergeStocks();
    });

    function toggleTable(symbol) {
      state.isMinimized[symbol] = !state.isMinimized[symbol];
    }

    function addToLocalStorage(stockList) {
      try {
        let savedStocks = JSON.parse(localStorage.getItem('savedStocks')) || [];
        if (!savedStocks.some(stock => stock[0].Symbol === stockList[0].Symbol)) {
          savedStocks.push(stockList);
          localStorage.setItem('savedStocks', JSON.stringify(savedStocks));
          mergeStocks(); // Refresh the stocks after updating localStorage
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
        mergeStocks(); // Refresh the stocks after removal
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
      menuOpen,
      toggleMenu, 
      isMobile,
    };
  },
  methods: {
    viewChart(symbol) {
      this.$router.push(`/chart/${symbol}`);
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.responsive-table {
  overflow-x: auto;
}

.stock-table-container {
  margin: 20px 0;
}

/* Table Styles */
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 10px;
}

th,
td {
  text-align: center;
  padding: 12px;
  border: 1px solid #757575;
  font-size: 18px;
}

/* First column bold in the stock table */
.stock-table td:first-child {
  font-weight: bold;
}
.hamburger-btn {
  display: none; /* Hidden by default */
  background-color: var(--navbar-bg-color);
  color: var(--main-text-color); /* White color for the icon */
  padding: 10px 15px; /* Padding */
  border: none; /* No border */
  cursor: pointer; /* Cursor pointer */
}

.hamburger-menu {
  font-weight: bold;
  font-size: large;
  display: block; /* Show the menu */
  position: absolute; /* Positioning */
  background-color: var(--navbar-bg-color);
  min-width: 160px; /* Minimum width */
  box-shadow: 0px 8px 32px 0px rgba(0, 0, 0, 0.978); 
  z-index: 1; /* Ensure it's above other content */
  
}

.hamburger-menu a {
  color: black; /* Text color */
  padding: 12px 16px; /* Padding */
  text-decoration: none; /* No underline */
  display: block; /* Block level elements */
}

.hamburger-menu a:hover {
  background-color: #ddd; /* Light grey background on hover */
}


button {
  padding: 10px 15px;
  background-color: var(--button-bg-color);
  color: var(--button-text-color);
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
  margin: 10px;
  font-family: inherit;
}

button:hover {
  background-color: var(--button-hover-bg-color);
}

@media (max-width: 768px) {
  .hamburger-btn {
    display: block; 
  }
  th,
  td {
    padding: 10px;
  }
  table,
  th,
  td {
    font-size: 14px;
  }
}

/* Additional responsiveness for very small screens */
@media (max-width: 480px) {

  .stock-table-container,
  .responsive-table {
    padding: 0 5px;
    /* Adds padding on the very edges for small screens */
  }
}</style>

