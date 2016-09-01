import { Component, OnInit, ngAfterViewInit } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/forms';

import { StocksService } from "../services/stocks.service";

@Component({
    selector: 'my-home',
    templateUrl: 'components/home/home.component.html',
    styleUrls: ['components/home/home.component.css'],
    directives: [FORM_DIRECTIVES]
})
export class HomeComponent implements OnInit {
    stocks: any[] = [];
    stockNames: any[] = [];

    stocksGraphData: any[] = [];
    stock: object = {};      

    constructor(private stocksService: StocksService) { 
        this.stock = {
            name: '',
            code: ''
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
              error =>  this.errorMessage = <any>error
            );         
    }
    
    loadStockData() {
        let currentStock = {};
        this.stockNames = [];
        
        for(let i = 0; i < this.stocks.length; i++) {
            currentStock = this.stocks[i];
            console.log("Pushing stock names onto array: ", currentStock);
            this.stockNames.push(currentStock.code); 
        }
        console.log("Stock Names array: ", this.stockNames);
        this.initializeGraph();
    }
    
    
    
    getStockDetails() {
        // Used when adding a new stock to track
        console.log("Will look up the name for stock with code of: ", this.stock);
        
        this.stocksService.getStockDetail(this.stock.code)
            .subscribe(
              stock => {
                console.log("Stock Detail: ", stock);
                this.stock = stock;
                this.saveStock();
              },
              error =>  this.errorMessage = <any>error
            );        
    }
    
    saveStock() {
        console.log("Saving stock: ", this.stock);
        
        this.stocksService.saveStock(this.stock)
            .subscribe(
              stock => {
                this.stocks.push(this.stock);
                this.loadStockData();
              },
              error =>  this.errorMessage = <any>error
            );        
    }
    
    untrackStock(id:string) {
        this.stocksService.deleteStock(id)
            .subscribe(
              stock => {
                this.getStocks();
              },
              error =>  this.errorMessage = <any>error
            );        
    }
    
    initializeGraph() {
        let snArray = this.stockNames;
        
        $(function () {
            
            var seriesOptions = [],
                seriesCounter = 0,
                names = snArray;
        
            /**
             * Create the chart when all data is loaded
             * @returns {undefined}
             */
            function createChart() {
        
                $('#graph').highcharts('StockChart', {
        
                    rangeSelector: {
                        selected: 4
                    },
        
                    yAxis: {
                        labels: {
                            formatter: function () {
                                return (this.value > 0 ? ' + ' : '') + this.value + '%';
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
        
            $.each(names, function (i, name) {
        
                $.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=' + name.toLowerCase() + '-c.json&callback=?',    function (data) {
        
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
            });
        }); 
    }     
    
}