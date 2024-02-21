<template>
    <div class="fetch-con">
        <input class="input-field" type="text" v-model="ticker" placeholder="Enter Stock Ticker" />
        <button class="fetch-btn" @click="fetchAndDisplayData()">
            <img src="../assets/search.png" alt="search for ticker" />
        </button>
    </div>
</template>

<script>
import axios from 'axios';
import { reactive, toRefs } from 'vue';

export default {
    name: 'FetchData',
    setup(_, { emit }) {
        const state = reactive({
            ticker: "",
            IncomeAndMetrics: [],
            stocks: [],
            error: null,
            // Remember to move the API key to a more secure place, like environment variables or server-side handling
            apikey: "1z3Eat6B3MbUU0ayvXDBXEt4D82W1Zmo",
        });

        // Key mapping structure
        const keyMapping = {
            "AvgInventory": "averageInventory",
            "AvgPayables": "averagePayables",
            "AvgReceivables": "averageReceivables",
            "BookVal/Share": "bookValuePerShare",
            "CalendarYear": "calendarYear",
            "Cash/Share": "cashPerShare",
            "CIK": "cik",
            "CostRevenue": "costOfRevenue",
            "CurrentRatio": "currentRatio",
            "Date": "date",
            "DebtToAssets": "debtToAssets",
            "DebtToEquity": "debtToEquity",
            "DividendYield": "dividendYield",
            "EarningsYield": "earningsYield",
            "EBITDA": "ebitda",
            "EBITDARatio": "ebitdaratio",
            "GrahamNumber": "grahamNumber",
            "GrossProfit": "grossProfit",
            "GrossProfRatio": "grossProfitRatio",
            "IncomeQuality": "incomeQuality",
            "IntExpense": "interestExpense",
            "IntIncome": "interestIncome",
            "MarketCap": "marketCap",
            "NetDebtToEBITDA": "netDebtToEBITDA",
            "NetIncome": "netIncome",
            "NetInc/Share": "netIncomePerShare",
            "NetIncRatio": "netIncomeRatio",
            "PayoutRatio": "payoutRatio",
            "PbRatio": "pbRatio",
            "PeRatio": "peRatio",
            "Period": "period",
            "PFCFRatio": "pfcfRatio",
            "POCFRatio": "pocfratio",
            "PTSalesRatio": "priceToSalesRatio",
            "PTBRatio": "ptbRatio",
            "Currency": "reportedCurrency",
            "Revenue": "revenue",
            "Rev/Share": "revenuePerShare",
            "ROE": "roe",
            "ROIC": "roic",
            "ShrEq/Share": "shareholdersEquityPerShare",
            "Symbol": "symbol",
            "WorkingCapital": "workingCapital",
        };

        // Fetch data from the API
        const fetchApiData = async (endpoint) => {
            try {
                const url = `https://financialmodelingprep.com/api/${endpoint}&apikey=${state.apikey}`;
                const response = await axios.get(url);
                return response.data;
            } catch (error) {
                console.error("Error fetching data:", error);
                state.error = error;
                return []; // Return an empty array to avoid further errors in processing
            }
        };

        // Combine data from different sources
        const combineData = (incomeData, metricsData, discountedCashFlow) => {
            const maxLength = Math.max(incomeData.length, metricsData.length, discountedCashFlow.length);
            return Array.from({ length: maxLength }, (_, i) => {
                const combinedObject = {
                    ...incomeData[i],
                    ...metricsData[i],
                    ...discountedCashFlow[i],
                };
                removeLastTwoKeyValues(combinedObject);
                return combinedObject;
            });
        };

        // Rename keys based on the keyMapping
        const renameKeys = (combinedObject) => {
            const renamedObject = {};
            for (const [newKey, oldKey] of Object.entries(keyMapping)) {
                if (combinedObject.hasOwnProperty(oldKey)) {
                    renamedObject[newKey] = combinedObject[oldKey];
                }
            }
            return renamedObject;
        };

        // Remove keys that are not needed
        const removeLastTwoKeyValues = (obj) => {
            const keys = Object.keys(obj);
            keys.forEach((key) => {
                if (typeof obj[key] === 'string' && obj[key].includes('http')) {
                    delete obj[key];
                }
            });
        };

       
        const fetchAndDisplayData = async () => {
            try {
                const incomeData = await fetchApiData(`v3/income-statement/${state.ticker}?period=annually`);
                const metricsData = await fetchApiData(`v3/key-metrics/${state.ticker}?period=annually`);
                const discountedCashFlow = await fetchApiData(`v4/advanced_discounted_cash_flow?symbol=${state.ticker}`);

                let combined = combineData(incomeData, metricsData, discountedCashFlow);
                combined = combined.map(obj => renameKeys(obj)); // Apply key renaming
                state.IncomeAndMetrics = [combined.slice(0, 5)]; // Keep only the latest 5 reports

                // Update the stocks state with the processed data
                state.stocks.push(...state.IncomeAndMetrics);
                    emit('data-fetched', state.stocks);
            } catch (error) {
                state.error = error;
            }
        };

        // Expose reactive state and functions to the template
        return {
            ...toRefs(state),
            fetchAndDisplayData,
        };
    },
};
</script>
  
<style scoped>
.fetch-con {
    margin-top: 3rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.input-field {
    outline: none;
    height: 3rem;
    width: 15rem;
    border: 1px solid #727272;
    border-right: none;
    border-radius: 15px 0px 0px 15px;
    padding: 8px;
    font-size: 18px;
    background-color: var(--main-bg-color);
    color: var(--main-text-color);

}

.input-field:focus {
    outline: none;
    border: 1px solid #a8a8a8;
}

.fetch-btn {
    height: 3rem;
    width: 3rem;
    border-radius: 0;
    border: none;
    outline: none;
    background-color: #3a99ff;
    cursor: pointer;
}
.fetch-btn:hover {
    background-color: #3488e1;
}
</style>
