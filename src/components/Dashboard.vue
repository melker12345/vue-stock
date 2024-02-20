
<template>
    <div class="dashBoard">
        <div class="fetch">
            <fetch @data-fetched="handleDataFetched" />
        </div>
        <div>
            <table-component :income-and-metrics="incomeAndMetrics" />
        </div>
    </div>
</template>
  
<script>
import Fetch from './fetch.vue';
import TableComponent from './table.vue';

export default {
    components: {
        Fetch,
        TableComponent,
    },
    name: 'Dashboard',
    data() {
        return {
            incomeAndMetrics: [],
        };
    },
    methods: {
        handleDataFetched(data) {
            this.incomeAndMetrics = data;
            console.log(this.incomeAndMetrics, 'Data fetched: dashboard.vue'); // in Dashboard.vue this currently logs the right data from fetch.vue thto the console but still no table is displayed
        },
    },
};
</script>

<style scoped>
body {
    background-color: var(--main-bg-color);
    color: var(--main-text-color);
}

.dashBoard-header {
    height: 2rem;
    margin: 1rem;
}

.dashBoard-header h4 {
    padding: 0;
}

.dashBoard {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: nowrap;
    flex-direction: column;
    padding: 20px;
}
</style>