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
            // Component's local state
            ticker: "",
            IncomeAndMetrics: [],
            apikey: "1z3Eat6B3MbUU0ayvXDBXEt4D82W1Zmo",
        };
    },
    methods: {
        // Define methods for your component
        async fetchAndDisplayData() {
            try {
                const incomeData = await this.fetchApiData(
                    `income-statement/${this.ticker}`
                );
                const metricsData = await this.fetchApiData(
                    `key-metrics/${this.ticker}`
                );
                const discountedCashFlow = await this.fetchApiData(
                    `discounted-cash-flow/${this.ticker}`
                );
                const combined = this.combineData(
                    incomeData,
                    metricsData,
                    discountedCashFlow
                );
                this.IncomeAndMetrics = combined.splice(0, 5); // Update the value of IncomeAndMetrics instead of pushing to it
                EventBus.emit('incomeAndMetricsChanged', this.IncomeAndMetrics);
                console.log(combined, ' combinedData from fetch.vue');
                console.log(this.IncomeAndMetrics, ' IncomeAndMetrics from fetch.vue');
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        },
        async fetchApiData(endpoint) {
            const url = `https://financialmodelingprep.com/api/v3/${endpoint}?period=annualy&apikey=${this.apikey}`;
            try {
                const response = await axios.get(url);
                return response.data;
            } catch (error) {
                console.error("Error fetching data:", error);
                throw new Error(error);
            }

        },
        combineData(incomeData, metricsData, discountedCashFlow) {
            if (!Array.isArray(incomeData) || !Array.isArray(metricsData)) {
                console.error("Data is not in array format from combined data :", { incomeData, metricsData, discountedCashFlow});
                return [];
            }
            const combinedData = [];
            const maxLength = Math.max(incomeData.length, metricsData.length, discountedCashFlow.length);
            for (let i = 0; i < maxLength; i++) {
                const income = incomeData[i];
                const metrics = metricsData[i];
                const discounted = discountedCashFlow[i];
                if (income && metrics && discounted) {
                    combinedData.push({ ...income, ...metrics, ...discounted, date: income.date });
                } else if (income) {
                    combinedData.push({ ...income, date: income.date });
                } else if (metrics) {
                    combinedData.push({ ...metrics, date: metrics.date });
                } else if (discounted) {
                    combinedData.push({ ...discounted, date: discounted.date });
                }
            }
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
.input-field{
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

.input-field:focus{
    outline: none;
    border: 1px solid #004daa;
}

.fetch-btn{
    height: 2rem;
    width: 2rem;
    border-radius: 0 5px 5px 0;
    border: none;
    outline: none;
    background-color: rgb(35, 142, 133);
    cursor: pointer;
}

</style>
