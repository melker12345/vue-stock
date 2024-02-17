# Stock site

### TODO: 
- Table
  - Minimized table [x]
  - Multiple tables [ ]
  - local storage manegement [ ]
  - Information bubble [ ]

<br>

- Filter
  - Page or overlay for filter
  - Select metrics to be displayed
  - Set ranges for all metrics (below, above, between)
  - Sector or country

<br>

- Chart
  - Fetch and display chart of stock 
  - implement (https://github.com/melker12345/StockSite)

---
### Table.vue

<br>

##### Minimized Table
  - Minimized table should have 2 rows and 6 columns
  - Top row should consist of preselected key metrics  
  - This allows for a better overview if the user wants to display multiple tables

##### Multiple tables
  - List of tables
  - Eeach table should have a minimize/expand and add/remove button
  - Once the user fetches a new ticker a table is generated for that ticker 

---

##### Local storage:
- Buttons for adding and removing stocks from local storage 
  - Button that adds all data to local storage 
  - Button that removes all data from local storage.
  <br>
- Stored stock data should render on page load
  - Add buttin should push the full  ```` incomeAndMetrics[]```` for that stock to a new list
  - ````savedStocks[]```` list should consist of a list for every stock saved e.g. ```` let savedStock = [[{}]...[{}], [{}]] ```` 

---

##### Information bubble 
  - Add a small (i) icon to every cell containing a metric 
  - When clicking that cell show the respective explanation for that metric
---

### Filter.vue
