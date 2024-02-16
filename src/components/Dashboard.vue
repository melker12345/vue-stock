<template>
    <div class="dashBoard-header">
    </div>

    <div class="dashBoard">
        <div class="fetch">
            <fetch />
        </div>
        <div>
            <div>
                <table @incomeAndMetricsChanged="handleIncomeAndMetricsChanged"></table>
            </div>
            <table-component />
        </div>
    </div>
</template>
  
<script>
import fetch from './fetch.vue';
import TableComponent from './table.vue';

export default {

    components: {
        fetch,
        'table-component': TableComponent,
        'incomeAndMetricsChanged': TableComponent,
    },
    name: 'Dashboard',
    data() {
        return {
            // this will hold the value from Fetch.vue
        };
    },
    setup() {

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