<template>
  <button @click="toggleTable">{{ ifMinimized }}</button>
  <button @click="addToLocalStorage()">ADD TO LOCAL</button>
  <button @click="removeFromLocalStorage()">REMOVE LOCAL</button>
  <div class="table-container">

    <table class="table">
      <thead>
        <tr>
          <th>Nyckel tal</th>
          <th v-for="data in incomeAndMetrics" :key="data.date">
            {{ data.symbol }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(value, key) in keyMapping" :key="key" v-show="!isMinimized || index === 0">
          <td>{{ key.toUpperCase() }}</td>
          <td v-for="data in incomeAndMetrics" :key="data.date + key">
            {{ formatNumber(data[value]) }}
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Buttons here -->
  </div>

</template>


<script>

import { EventBus } from '../event-bus.js';
export default {
  name: 'table',
  data() {
    return {
      isMinimized: true,
      ifMinimized: 'expand',
      incomeAndMetrics: [],
      keyMapping: {
        "Accepted Date": "acceptedDate",
        "Avg Inventory": "averageInventory",
        "Avg Payables": "averagePayables",
        "Avg Receivables": "averageReceivables",
        "BookVal/Share": "bookValuePerShare",
        "Calendar Year": "calendarYear",
        "Capex/Share": "capexPerShare",
        "CapexToDepr": "capexToDepreciation",
        "CapexToOCF": "capexToOperatingCashFlow",
        "CapexToRev": "capexToRevenue",
        "Cash/Share": "cashPerShare",
        "CIK Code": "cik",
        "Cost Expenses": "costAndExpenses",
        "Cost Revenue": "costOfRevenue",
        "Current Ratio": "currentRatio",
        "Date": "date",
        "Days Inv Hand": "daysOfInventoryOnHand",
        "Days Pay Out": "daysPayablesOutstanding",
        "Days Sales Out": "daysSalesOutstanding",
        "Debt To Assets": "debtToAssets",
        "Debt To Equity": "debtToEquity",
        "Depr Amort": "depreciationAndAmortization",
        "Dividend Yield": "dividendYield",
        "Earnings Yield": "earningsYield",
        "EBITDA": "ebitda",
        "EBITDA Ratio": "ebitdaratio",
        "Enterprise Val": "enterpriseValue",
        "EV Over EBITDA": "enterpriseValueOverEBITDA",
        "EPS": "eps",
        "EPS Diluted": "epsdiluted",
        "EV To FCF": "evToFreeCashFlow",
        "EV To OCF": "evToOperatingCashFlow",
        "EV To Sales": "evToSales",
        "Filling Date": "fillingDate",
        "FCF/Share": "freeCashFlowPerShare",
        "FCF Yield": "freeCashFlowYield",
        "Gen Adm Expenses": "generalAndAdministrativeExpenses",
        "Graham NetNet": "grahamNetNet",
        "Graham Number": "grahamNumber",
        "Gross Profit": "grossProfit",
        "GrossProf Ratio": "grossProfitRatio",
        "Inc Before Tax": "incomeBeforeTax",
        "IncBfTax Ratio": "incomeBeforeTaxRatio",
        "IncomeTax Expense": "incomeTaxExpense",
        "Income Quality": "incomeQuality",
        "Int Expense": "interestExpense",
        "Int Income": "interestIncome",
        "Inv Turnover": "inventoryTurnover",
        "Invested Capital": "investedCapital",
        "Market Cap": "marketCap",
        "NCA Value": "netCurrentAssetValue",
        "NetDebt To EBITDA": "netDebtToEBITDA",
        "Net Income": "netIncome",
        "NetInc/Share": "netIncomePerShare",
        "NetInc Ratio": "netIncomeRatio",
        "OCF/Share": "operatingCashFlowPerShare",
        "Operating Exp": "operatingExpenses",
        "Operating Inc": "operatingIncome",
        "OperatingInc Rat": "operatingIncomeRatio",
        "Other Expenses": "otherExpenses",
        "Payables Turn": "payablesTurnover",
        "Payout Ratio": "payoutRatio",
        "PB Ratio": "pbRatio",
        "PE Ratio": "peRatio",
        "Period": "period",
        "PFCF Ratio": "pfcfRatio",
        "POCF Ratio": "pocfratio",
        "PT Sales Ratio": "priceToSalesRatio",
        "PTB Ratio": "ptbRatio",
        "Recv Turnover": "receivablesTurnover",
        "Reported Curr": "reportedCurrency",
        "R&D To Revenue": "researchAndDdevelopementToRevenue",
        "RTN Tang Assets": "returnOnTangibleAssets",
        "Revenue": "revenue",
        "Rev/Share": "revenuePerShare",
        "R&D Expense": "researchAndDevelopmentExpenses",
        "ROE": "roe",
        "ROIC": "roic",
        "SG&A To Rev": "salesGeneralAndAdministrativeToRevenue",
        "Selling&Mkt Exp": "sellingAndMarketingExpenses",
        "SG&A Expense": "sellingGeneralAndAdministrativeExpenses",
        "ShrEq/Share": "shareholdersEquityPerShare",
        "SBC To Revenue": "stockBasedCompensationToRevenue",
        "Symbol": "symbol",
        "Tangible Ast Val": "tangibleAssetValue",
        "TangBkVal/Share": "tangibleBookValuePerShare",
        "TotalOthIncExpN": "totalOtherIncomeExpensesNet",
        "W AvgShs Out": "weightedAverageShsOut",
        "W AvgShsOut Dil": "weightedAverageShsOutDil",
        "Working Capital": "workingCapital",
      },
    };
  },
  methods: {
    toggleTable() {
      this.isMinimized = !this.isMinimized;
      if (this.isMinimized) {
        this.ifMinimized = 'expand';
      } else  {        
        this.ifMinimized = 'hide';
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
  beforeUnmount() {
    // Clean up the event listener, specify the function if necessary
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Arial', sans-serif;
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

.table-container {
  overflow-x: auto;
  margin: 20px 20px;
}

.table {
  border-collapse: collapse;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 32px;
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
  background-color: #3a99ff;
  color: #ffffff;
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

button{
  margin: 20px;
  padding: 10px 20px;
  background-color: var(--button-bg-color);
  color: var(--button-text-color);
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
}
</style>
