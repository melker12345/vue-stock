
<template>
  <div class="table-container">
    <div class="btn-con">
      <button @click="toggleTable">{{ ifMinimized }}</button>
      <button @click="addToLocalStorage()">ADD TO LOCAL</button>
      <button @click="removeFromLocalStorage()">REMOVE LOCAL</button>
    </div>
    <div class="table-responsive">
      <table class="table" v-if="!isMinimized && incomeAndMetrics !== undefined">
        <thead>
          <tr>
            <th>Last 5 reports for {{ incomeAndMetrics[0].symbol }}</th>
            <th v-for="data in incomeAndMetrics" :key="data.date">
              {{ data.date }}
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

      <table class="table-minimized" v-if="incomeAndMetrics && incomeAndMetrics.length > 0">
        <thead>
          <tr >
            <!-- Headers from keyMapping -->
            <th> Last 5 reports for {{ incomeAndMetrics[0].symbol }} </th>
            <th> peRatio </th>
            <th> debtToEquity </th>
            <th> dividendYield </th>
            <th> revenue </th>
            <th> payoutRatio </th>

          </tr>
        </thead>

        <tbody>
          <tr >
          <td>{{ incomeAndMetrics[0].symbol }}</td>
          <td>{{ formatNumber(incomeAndMetrics[0].peRatio) }}</td>
          <td>{{ formatNumber(incomeAndMetrics[0].debtToEquity) }}</td>
          <td>{{ formatNumber(incomeAndMetrics[0].dividendYield) }}</td>
          <td>{{ formatNumber(incomeAndMetrics[0].revenue) }}</td>
          <td>{{ formatNumber(incomeAndMetrics[0].payoutRatio) }}</td>
        </tr>
        </tbody>
    </table>
      <!-- Buttons here -->
    </div>
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
.table-responsive {
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
.table-container {
  overflow-x: auto;
}

.table {
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
  width: 100%;
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

.table td:first-child {
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
  .table-responsive {
    overflow-y: hidden;
  }
}</style>
