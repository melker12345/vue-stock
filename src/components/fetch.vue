<template>
    <!-- HTML Markup goes here. Use Vue directives like v-for, v-if, v-model etc. -->
    <div class="fetch-con">
        <input class="input-field" type="text" v-model="ticker" placeholder="Enter Stock Ticker" />
        <button class="fetch-btn" @click="fetchAndDisplayData()">
            <img src="../assets/search.png" alt="search for ticker" />
        </button>
    </div>
</template>
  
<script>
import axios from 'axios';
import { EventBus } from '../event-bus.js';

export default {
    name: 'fetch', // Component name
    components: {
        // Import and use other components if needed
    },
    props: {
        // Declare props to receive data from parent component
    },
    data() {
        return {

            ticker: "", // Input field value for stock ticker
            IncomeAndMetrics: [], // Array to store fetched data
            apikey: "1z3Eat6B3MbUU0ayvXDBXEt4D82W1Zmo", // API key for financial data
            // Define mapping of long keys to shorter names the keys are the iriginal keys from the API and the values are the new keys
 
        };
    },
    methods: {
        // Define methods for your component
        async fetchAndDisplayData() {
            try {
                // planing to add 
                // https://financialmodelingprep.com/api/v3/quote/AAPL,FB,GOOG?apikey= 
                // 'https://financialmodelingprep.com/api/v3/historical-price-full/stock_dividend/AAPL?apikey=1z3Eat6B3MbUU0ayvXDBXEt4D82W1Zmo'

                // Fetch income data from API
                const incomeData = await this.fetchApiData(
                    `v3/income-statement/${this.ticker}?period=annually`
                );
                // Fetch metrics data from API
                const metricsData = await this.fetchApiData(
                    `v3/key-metrics/${this.ticker}?period=annually`
                );

                // Fetch discounted cash flow data from API currently not working
                const discountedCashFlow = await this.fetchApiData(
                    `v4/advanced_discounted_cash_flow?symbol=${this.ticker}`
                );

                // Combine fetched data into a single array
                const combined = this.combineData(
                    incomeData,
                    metricsData,
                    discountedCashFlow
                );

                this.IncomeAndMetrics = combined.splice(0, 5);

                // Emit event to notify other components about the updated data
                EventBus.emit('incomeAndMetricsChanged', this.IncomeAndMetrics);

                console.log(combined, ' combinedData from fetch.vue');
                console.log(this.IncomeAndMetrics, ' IncomeAndMetrics from fetch.vue');
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        },
        async fetchApiData(endpoint) {
            const url = `https://financialmodelingprep.com/api/${endpoint}&apikey=${this.apikey}`;
            try {
                // Make API request using axios
                const response = await axios.get(url);
                // console.log(response.data, 'response from fetch.vue');
                return response.data;
            } catch (error) {
                console.error("Error fetching data:", error);
                throw new Error(error);
            }

        },
        // Example mapping of long keys to shorter names


        // Function to rename keys based on the mapping
        
        combineData(incomeData, metricsData, discountedCashFlow) {
            if (!Array.isArray(incomeData) || !Array.isArray(metricsData) || !Array.isArray(discountedCashFlow)) {
                console.error("Data is not in array format:", { incomeData, metricsData, discountedCashFlow });
                return [];
            }

            const combinedData = [];
            const maxLength = Math.max(incomeData.length, metricsData.length, discountedCashFlow.length);
            for (let i = 0; i < maxLength; i++) {
                let combinedObject = {};
                const income = incomeData[i] || {};
                const metrics = metricsData[i] || {};
                const discounted = discountedCashFlow[i] || {};

                // Combine the data from different sources
                combinedObject = { ...income, ...metrics, ...discounted };

                // Ensure there's a date in the combined object
                if (income.date) {
                    combinedObject.date = income.date;
                } else if (metrics.date) {
                    combinedObject.date = metrics.date;
                } else if (discounted.date) {
                    combinedObject.date = discounted.date;
                }

                // Rename keys of the combinedObject using the component's method and keyMapping
        

                // Helper function defined within combineData to ensure access to 'combinedObject'
                const removeLastTwoKeyValues = (obj) => {
                    const keys = Object.keys(obj);
                    keys.forEach((key) => {
                        if (typeof obj[key] === 'string' && obj[key].includes('http')) {
                            delete obj[key];
                        }
                    });
                };

                // Remove the last two key-value pairs from the combined object
                removeLastTwoKeyValues(combinedObject);

                // Push the processed object to the combinedData array
                combinedData.push(combinedObject);
            }
            console.log(this.keyMapping, 'keyMapping from fetch.vue')
            return combinedData;
        },
    },
    computed: {
        // Define computed properties for dynamic calculations
    },
    watch: {
        // Watchers to react to changes in props or data
    },
    // Other component options like lifecycle hooks can be added here
};
</script>
  
<style scoped>
/* CSS styles specific to this component. 'scoped' ensures styles are local to this component only */

.fetch-con {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 1rem;

}

.input-field {
    outline: none;
    border: none;
    height: 2rem;
    width: 10rem;
    border-radius: 50px 0 0 50px;
    padding: 8px;
    font-size: 1rem;
    font-weight: 500;
    font-family: 'Inter', sans-serif;
    background-color: rgb(43, 43, 43);

}

.input-field:focus {
    outline: none;
    border: 1px solid #004daa;
}

.fetch-btn {
    height: 2rem;
    width: 2rem;
    border-radius: 0 5px 5px 0;
    border: none;
    outline: none;
    background-color: rgb(35, 142, 133);
    cursor: pointer;
}
</style>
