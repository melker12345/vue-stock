<template>
    <div class="dashBoard-header">
        <h4>Dashboard</h4>
    </div>
    
    <div class="dashBoard">
        <fetch />
        <table-component />
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
    // other component options...
};
</script>

<style scoped>
*{
    background-color: #303030;
}
.dashBoard-header {
    height: 2rem;
    margin: 5rem;
    height: fit-content ;
    
}

.dashBoard-header h4{

    padding: 0;
    font-size: 1.5rem;
    font-weight: 500;
    font-family: 'Inter', sans-serif;
    color: #dfdcd8;
    text-align: center;
}
.dashBoard{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: nowrap;
    flex-direction: column;
    max-width: 100vw;
    padding: 20px;
    margin-top: 3rem;
}
</style>