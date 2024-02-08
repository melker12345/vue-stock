<template>
    <div class="dashBoard-header">
    </div>

    <div class="dashBoard">
        <div class="fetch">
            <fetch />
        </div>
        <div>
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
    }
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
    height: fit-content;

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
    margin: 3rem;
}
</style>