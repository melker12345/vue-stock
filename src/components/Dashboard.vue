<template>
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

<style>
body{
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 100vw;
    padding: 20px;
    border: 1px solid lightblue;
}
.dashBoard {
    border: 1px solid red;
}
</style>