
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
  <button @click="addToLocalStorage()">ADD TO LOCAL</button>
  <button @click="removeFromLocalStorage()">REMOVE LOCAL</button>
</template>


<script>

import { EventBus } from '../event-bus.js';
export default {
  name: 'table',
  data() {
    return {
      isMinimized: false,
      incomeAndMetrics: [],
      keyMapping: {
        accDate: "acceptedDate",
        avgInv: "averageInventory",
        avgPay: "averagePayables",
        avgRecv: "averageReceivables",
        bvPerSh: "bookValuePerShare",
        calYear: "calendarYear",
        capexPerSh: "capexPerShare",
        capexToDep: "capexToDepreciation",
        capexToOCF: "capexToOperatingCashFlow",
        capexToRev: "capexToRevenue",
        cashPerSh: "cashPerShare",
        cikCode: "cik",
        costExp: "costAndExpenses",
        costRev: "costOfRevenue",
        curRatio: "currentRatio",
        date: "date",
        daysInvHand: "daysOfInventoryOnHand",
        daysPayOut: "daysPayablesOutstanding",
        daysSalesOut: "daysSalesOutstanding",
        debtToAst: "debtToAssets",
        debtToEq: "debtToEquity",
        deprAmort: "depreciationAndAmortization",
        divYield: "dividendYield",
        earnYield: "earningsYield",
        ebitda: "ebitda",
        ebitdaRat: "ebitdaratio",
        entValue: "enterpriseValue",
        evOverEbitda: "enterpriseValueOverEBITDA",
        eps: "eps",
        epsDil: "epsdiluted",
        evToFcf: "evToFreeCashFlow",
        evToOCF: "evToOperatingCashFlow",
        evToSales: "evToSales",
        fillDate: "fillingDate",
        fcfPerSh: "freeCashFlowPerShare",
        fcfYield: "freeCashFlowYield",
        genAdmExp: "generalAndAdministrativeExpenses",
        grahamNet: "grahamNetNet",
        grahamNum: "grahamNumber",
        grossProf: "grossProfit",
        grossProfRat: "grossProfitRatio",
        incBfrTax: "incomeBeforeTax",
        incBfTaxRat: "incomeBeforeTaxRatio",
        incTaxExp: "incomeTaxExpense",
        incQual: "incomeQuality",
        intExp: "interestExpense",
        intInc: "interestIncome",
        invTurn: "inventoryTurnover",
        investCap: "investedCapital",
        mktCap: "marketCap",
        ncaValue: "netCurrentAssetValue",
        netDebtEbitda: "netDebtToEBITDA",
        netInc: "netIncome",
        netIncPerSh: "netIncomePerShare",
        netIncRat: "netIncomeRatio",
        ocfPerSh: "operatingCashFlowPerShare",
        opExp: "operatingExpenses",
        opInc: "operatingIncome",
        opIncRat: "operatingIncomeRatio",
        othExp: "otherExpenses",
        payTurn: "payablesTurnover",
        payoutRat: "payoutRatio",
        pbRat: "pbRatio",
        peRat: "peRatio",
        period: "period",
        pfcfRat: "pfcfRatio",
        pocfRat: "pocfratio",
        ptSalesRat: "priceToSalesRatio",
        ptbRat: "ptbRatio",
        recvTurn: "receivablesTurnover",
        repCurr: "reportedCurrency",
        rndToRev: "researchAndDdevelopementToRevenue",
        rtnTangAst: "returnOnTangibleAssets",
        revenue: "revenue",
        revPerSh: "revenuePerShare",
        rndExp: "researchAndDevelopmentExpenses",
        roe: "roe",
        roic: "roic",
        sgaToRev: "salesGeneralAndAdministrativeToRevenue",
        sellMktExp: "sellingAndMarketingExpenses",
        sgaExp: "sellingGeneralAndAdministrativeExpenses",
        shrEqPerSh: "shareholdersEquityPerShare",
        sbcToRev: "stockBasedCompensationToRevenue",
        symbol: "symbol",
        tangAstVal: "tangibleAssetValue",
        tangBkValPerSh: "tangibleBookValuePerShare",
        totOthIncExpN: "totalOtherIncomeExpensesNet",
        wAvgShsOut: "weightedAverageShsOut",
        wAvgShsOutDil: "weightedAverageShsOutDil",
        workCap: "workingCapital",
      },
    };
  },
  methods: {
    toggleTable() {
      this.isMinimized = this.isMinimized;
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
  max-width: 225px;
  padding: 0px;
  text-align: center;
  border-bottom: 1px solid #ddd;
  border: 1px solid black;
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
