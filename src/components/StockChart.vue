<template>
  <Navbar />
  <div class="chart-container">
    <!-- This div will host the Highchart -->
    <div class="chart">
      <div ref="chartContainer"></div>
    </div>
  </div>
</template>
<script>
import Highcharts from 'highcharts/highstock';
import axios from 'axios';
import Navbar from './navbar.vue';

export default {
  props: ['symbol'],
  components: {
    Navbar
  },
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    this.fetchStockData();
  },
  methods: {
    fetchStockData() {
      const url = `https://financialmodelingprep.com/api/v3/historical-price-full/${this.symbol}?apikey=1z3Eat6B3MbUU0ayvXDBXEt4D82W1Zmo`;

      axios.get(url)
        .then(response => {
          const data = this.processData(response.data.historical);
          this.createChart(data, this.symbol);
        })
        .catch(error => console.error('Error fetching stock data:', error));
    },
    processData(historicalData) {
      return historicalData.map(item => {
        return [
          new Date(item.date).getTime(),
          item.close 
        ];
      }).reverse(); 
    },
    createChart(chartData, symbol) {
      if (this.chart) {
        this.chart.destroy();
      }

      this.chart = Highcharts.stockChart(this.$refs.chartContainer, {
        rangeSelector: {
          selected: 1
        },
        title: {
          text: `Stock Price of ${symbol} over last 5 years`
        },
        series: [{
          name: `${symbol} Stock Price`,
          data: chartData,
          tooltip: {
            valueDecimals: 2
          }
        }]
      });
    }
  },
};
</script>

<style scoped>
* {
  margin: 0;
  box-sizing: border-box;

}

body {
  background-color: var(--main-bg-color);
  color: var(--main-text-color);
}

.chart-container {

  margin-top: 3rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chart {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70%;
}

.chart>div {
  width: 100%;
}
</style>