import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import * as Highcharts from 'Highcharts';
import 'Highcharts/modules/exporting';

import * as $ from 'jquery';

import { StockService } from '../stock/stock.service';
import { IStock } from '../stock/stock';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('graph') graph: ElementRef;

  stocks: IStock[] = [];
  stockNames: any[] = [];

  stocksGraphData: any[] = [];
  stock: IStock;
  errorMessage: string | any;

  constructor(private stockService: StockService) {
    this.stock = {
      Name: null,
      code: null,
      Symbol: null
    };
  }

  /**
   * Get the names OnInit
   */
  ngOnInit() {
    this.getStocks();
  }

  getStocks() {
    this.stockService.getStocks()
      .subscribe(
        stocks => {
          this.stocks = stocks;
          this.loadStockData();
        },
        error => this.errorMessage = error
      );
  }

  loadStockData() {
    this.stockNames = [];

    for (let i = 0; i < this.stocks.length; i++) {
      const currentStock: IStock = this.stocks[i];
      this.stockNames.push(currentStock.code);
    }
    this.initializeGraph();
  }


  getStockDetails() {
    // Used when adding a new stock to track
    console.log("Will look up the name for stock with code of: ", this.stock);

    this.stockService.getStockDetail(this.stock.code)
      .subscribe(
        stock => {
          this.stock = stock;
          this.saveStock();
          this.initializeGraph();
        },
        error => this.errorMessage = error
      );
  }

  saveStock() {
    this.stockService.saveStock(this.stock)
      .subscribe(
        (/*stock*/) => {
          this.stocks.push({
            Name: this.stock.Name,
            code: this.stock.Symbol,
            Symbol: this.stock.Symbol
          });
          this.loadStockData();
        },
        error => this.errorMessage = error
      );
  }

  untrackStock(id: string) {
    this.stockService.deleteStock(id)
      .subscribe(
        (/*stock*/) => {
          this.getStocks();
        },
        error => this.errorMessage = error
      );
  }

  initializeGraph() {
    const snArray = this.stockNames;
    //const snNames = ["AAPL", "MSFT", "GOOG", "TWTR"];

    const seriesOptions = [];
    let seriesCounter = 0;
    const names = snArray;

    console.info('initializeGraph::names =', names, ';');

    const createChart = () => {
      Highcharts.chart('stockChart', {
        chart: {
          ignoreHiddenSeries: false
        },

        legend: {
          shadow: true
        },

        navigation: {
          buttonOptions: { enabled: false }
        },

        /*rangeSelector: {
          selected: 4
        },*/

        credits: {
          enabled: false
        },

        yAxis: {
          labels: {
            formatter: function() {
              return this.value > 0 ? ' + ' : '' + this.value + '%'
            }
          },
          plotLines: [{
            value: 0,
            width: 2,
            color: 'silver'
          }]
        },

        plotOptions: {
          series: {
            stacking: 'percent'
          }
        },

        tooltip: {
          pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
          valueDecimals: 2
        },

        series: seriesOptions
      });
    };

    // Highcharts
    names.forEach((name, i) => {
      $.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=' + name.toLowerCase() + '-c.json&callback=?', data => {

        seriesOptions[i] = {
          name: name,
          data: data
        };

        // As we're loading the data asynchronously, we don't know what order it will arrive. So
        // we keep a counter and create the chart when all the data is loaded.
        seriesCounter += 1;

        if (seriesCounter === names.length) {
          createChart();
        }
      });
      /*
      this.stockService.highstockApi(name)
        .map(data => {
          console.info('Got data back:', data, ';');

          seriesOptions[i] = {
            name: name,
            data: data
          };

          // As we're loading the data asynchronously, we don't know what order it will arrive. So
          // we keep a counter and create the chart when all the data is loaded.
          seriesCounter++;

          if (seriesCounter === names.length) {
            // Create the chart when all data is loaded
            console.info('Rendering');

            createChart();
          }
        });
        */
    });
  }
}
