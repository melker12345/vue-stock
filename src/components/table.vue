<template>
  <div class="table-container">
    <div class="btn-con">
      <button @click="toggleTable">{{ ifMinimized }}</button>
      <button @click="addToLocalStorage()">ADD TO LOCAL</button>
      <button @click="removeFromLocalStorage()">REMOVE LOCAL</button>
    </div>
    <table class="table" v-if="!isMinimized">
    <thead>
      <tr>
        <th>Nyckel tal</th>
        <th v-for="data in incomeAndMetrics" :key="data.date">
          {{ data.symbol }} 
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(value, key) in keyMapping" :key="key">
        <td>{{ key.toUpperCase() }}</td>
        <td v-for="data in incomeAndMetrics" :key="data.date + key">
          {{ formatNumber(data[value]) }}
        </td>
      </tr>
    </tbody>
  </table>

  <table class="table-minimized" v-else>
    <thead>
      <tr>
        <th :key="incomeAndMetrics.date">
          {{ incomeAndMetrics.symbol }} 
        </th>
      </tr>
    </thead>
    <tbody>
      <!-- Simplified data representation -->
      
      <!-- Add more rows as needed -->
    </tbody>
  </table>
    <!-- Buttons here -->
  </div>
</template>


<script>
// focus on addig the functionallity of having multiple tables so if the user fetches one stock a table is generated and if the user fetches another stock another table is generated don't change any other locic you previos replyes are incorrect they broke the 
import { EventBus } from '../event-bus.js';
export default {
  name: 'table',
  data() {
    return {
      isMinimized: true,
      ifMinimized: 'Expand',
      incomeAndMetrics: [],
      keyMapping: {
        "Accepted Date": "acceptedDate",
        "Avg Inventory": "averageInventory",
        "Avg Payables": "averagePayables",
        "Avg Receivables": "averageReceivables",
        "BookVal/Share": "bookValuePerShare",
        "Calendar Year": "calendarYear",
        "Cash/Share": "cashPerShare",
        "CIK Code": "cik",
        "Cost Revenue": "costOfRevenue",
        "Current Ratio": "currentRatio",
        "Date": "date",
        "Debt To Assets": "debtToAssets",
        "Debt To Equity": "debtToEquity",
        "Dividend Yield": "dividendYield",
        "Earnings Yield": "earningsYield",
        "EBITDA": "ebitda",
        "EBITDA Ratio": "ebitdaratio",
        "Graham Number": "grahamNumber",
        "Gross Profit": "grossProfit",
        "GrossProf Ratio": "grossProfitRatio",
        "Income Quality": "incomeQuality",
        "Int Expense": "interestExpense",
        "Int Income": "interestIncome",
        "Market Cap": "marketCap",
        "NetDebt To EBITDA": "netDebtToEBITDA",
        "Net Income": "netIncome",
        "NetInc/Share": "netIncomePerShare",
        "NetInc Ratio": "netIncomeRatio",
        "Payout Ratio": "payoutRatio",
        "PB Ratio": "pbRatio",
        "PE Ratio": "peRatio",
        "Period": "period",
        "PFCF Ratio": "pfcfRatio",
        "POCF Ratio": "pocfratio",
        "PT Sales Ratio": "priceToSalesRatio",
        "PTB Ratio": "ptbRatio",
        "Currency": "reportedCurrency",
        "Revenue": "revenue",
        "Rev/Share": "revenuePerShare",
        "ROE": "roe",
        "ROIC": "roic",
        "ShrEq/Share": "shareholdersEquityPerShare",
        "Symbol": "symbol",
        "Working Capital": "workingCapital",
      },
      stocks: [],
    };
  },
  methods: {
    toggleTable() {
      this.isMinimized = !this.isMinimized;
      if (this.isMinimized) {
        this.ifMinimized = 'Expand';
      } else {
        this.ifMinimized = 'Hide';
      }
    },
    addToLocalStorage(stockData) {
      let savedStocks = JSON.parse(localStorage.getItem('savedStocks')) || [];
      savedStocks.push(this.incomeAndMetrics);
      localStorage.setItem('savedStocks', JSON.stringify(savedStocks));
      console.log(this.incomeAndMetrics, 'from table.vue');
    },
    removeFromLocalStorage(index) {
      let savedStocks = JSON.parse(localStorage.getItem('savedStocks')) || [];
      savedStocks.splice(index, 1);
      localStorage.setItem('savedStocks', JSON.stringify(savedStocks));
      console.log(this.incomeAndMetrics, 'from table.vue');
    },
    formatNumber(value, currency) {
      currency = this.incomeAndMetrics[0].reportedCurrency;
      if (typeof value === "number") {
        if (value >= 1000000) {
          return (
            (value / 1e6).toFixed(0) + "M " + currency
          );
        }
        if (value <= -1000000) {
          return (
            (value / 1e6).toFixed(0) + "M " + currency
          );
        }
        return value.toFixed(2).toLocaleString();
      } else {
        return value;
      }
    },
    renameKeys(obj, keyMapping) {
      const renamedObj = {};
      for (let key in obj) {
        if (keyMapping.hasOwnProperty(key)) {
          renamedObj[keyMapping[key]] = obj[key];
        } else {
          renamedObj[key] = obj[key];
        }
      }
      return renamedObj;
    },

  },
  computed: {
    formattedIncomeAndMetrics() {
      return JSON.stringify(this.incomeAndMetrics, null, 2);
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
      console.log(this.incomeAndMetrics, 'from table.vue');
    });
  },

};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: var(--main-bg-color);
  color: var(--main-text-color);
}

body {
  background-color: #f5f5f5;
  color: #f5f5f5;
  font-size: 16px;
  line-height: 1.6;
  display: flex;
  display: flex;
  align-items: center;
  justify-content: center;

}
.btn-con{
  background-color: #49494951;
  border: 1px solid #000000;
}
.table-container {
  overflow-x: auto;
  margin: 20px 20px;
}

.table {
  border-collapse: collapse;
  /* margin: 32px; */
}

.table th,
.table td {
  max-width: 225px;
  padding: 15px;
  text-align: center;
  border-bottom: 1px solid #ddd;
  border: 1px solid black;
}

.table th {
  color: var(--main-text-color);
  font-weight: bold;
}

tr:nth-child(even) {
  background-color: #ff0000;
}

.table tr:hover {
  background-color: #ddd;
}

.table td {
  font-weight: normal;
}

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

.table td:first-child {
  font-weight: bold;
}

button {
  margin: 20px;
  padding: 10px 20px;
  background-color: var(--button-bg-color);
  color: var(--button-text-color);
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
}
button:nth-child(1){
  margin: 0;
}
button:nth-last-child(1){
  margin: 0;
}
</style>
