import { Component, OnInit } from '@angular/core';

import { IStock, StocksService } from "../services/stocks.service";
import { Jsonp } from '@angular/http';

@Component({
    selector: 'my-home',
    templateUrl: 'components/home/home.component.html',
    styleUrls: ['components/home/home.component.css']
})
export class HomeComponent implements OnInit {
    stocks: IStock[] = [];
    stockNames: any[] = [];

    stocksGraphData: any[] = [];
    stock: IStock;
    errorMessage: string | any;

    constructor(private jsonp: Jsonp, private stocksService: StocksService) {
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
        this.stocksService.getStocks()
            .subscribe(
              stocks => {
                this.stocks = stocks;
                this.loadStockData();
              },
              error =>  this.errorMessage = error
            );         
    }
    
    loadStockData() {
        this.stockNames = [];
        
        for(let i = 0; i < this.stocks.length; i++) {
            const currentStock: IStock = this.stocks[i];
            this.stockNames.push(currentStock.code); 
        }
        this.initializeGraph();
    }
    
    
    
    getStockDetails() {
        // Used when adding a new stock to track
        console.log("Will look up the name for stock with code of: ", this.stock);
        
        this.stocksService.getStockDetail(this.stock.code)
            .subscribe(
              stock => {
                this.stock = stock;
                this.saveStock();
              },
              error =>  this.errorMessage = error
            );        
    }
    
    saveStock() {
        this.stocksService.saveStock(this.stock)
            .subscribe(
                (/*stock*/) => {
                this.stocks.push({
                    Name: this.stock.Name,
                    code: this.stock.Symbol,
                    Symbol: this.stock.Symbol
                });
                this.loadStockData();
              },
              error =>  this.errorMessage = error
            );        
    }
    
    untrackStock(id:string) {
        this.stocksService.deleteStock(id)
            .subscribe(
                (/*stock*/) => {
                this.getStocks();
              },
              error =>  this.errorMessage = error
            );        
    }
    
    initializeGraph() {
        const snArray = this.stockNames;
        //const snNames = ["AAPL", "MSFT", "GOOG", "TWTR"];

        (() => {
            const seriesOptions = [];
            let seriesCounter = 0;
            const names = snArray;

            names.forEach((name, i) => {
                this.jsonp
                    .request('https://www.highcharts.com/samples/data/jsonp.php?filename=' + name.toLowerCase() + '-c.json&callback=JSONP_CALLBACK')
                    .map(data => {
                        seriesOptions[i] = {
                            name: name,
                            data: data
                        };

                        // As we're loading the data asynchronously, we don't know what order it will arrive. So
                        // we keep a counter and create the chart when all the data is loaded.
                        seriesCounter += 1;

                        if (seriesCounter === names.length) {
                            // Create the chart when all data is loaded
                            document.getElementById('graph')['highcharts']('StockChart', {
                                chart: {
                                    ignoreHiddenSeries: false
                                },

                                legend: {
                                    shadow: true
                                },

                                navigation: {
                                    enabled: false
                                },

                                rangeSelector: {
                                    selected: 4
                                },

                                credits: {
                                    enabled: 0
                                },

                                yAxis: {
                                    labels: {
                                        formatter: function() {
                                            return this.value > 0 ? ' + ' : ''  + this.value + '%'
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
                                        compare: 'percent'
                                    }
                                },

                                tooltip: {
                                    pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
                                    valueDecimals: 2
                                },

                                series: seriesOptions
                            });
                        }
                });
            });
        })();
    }
}
