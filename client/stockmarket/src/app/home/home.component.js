"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Highcharts = require("Highcharts");
require("Highcharts/modules/exporting");
var stock_service_1 = require("../stock/stock.service");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(jsonp, stockService) {
        this.jsonp = jsonp;
        this.stockService = stockService;
        this.stocks = [];
        this.stockNames = [];
        this.stocksGraphData = [];
        this.stock = {
            Name: null,
            code: null,
            Symbol: null
        };
    }
    /**
     * Get the names OnInit
     */
    HomeComponent.prototype.ngOnInit = function () {
        this.getStocks();
    };
    HomeComponent.prototype.getStocks = function () {
        var _this = this;
        this.stockService.getStocks()
            .subscribe(function (stocks) {
            _this.stocks = stocks;
            _this.loadStockData();
        }, function (error) { return _this.errorMessage = error; });
    };
    HomeComponent.prototype.loadStockData = function () {
        this.stockNames = [];
        for (var i = 0; i < this.stocks.length; i++) {
            var currentStock = this.stocks[i];
            this.stockNames.push(currentStock.code);
        }
        this.initializeGraph();
    };
    HomeComponent.prototype.getStockDetails = function () {
        var _this = this;
        // Used when adding a new stock to track
        console.log("Will look up the name for stock with code of: ", this.stock);
        this.stockService.getStockDetail(this.stock.code)
            .subscribe(function (stock) {
            _this.stock = stock;
            _this.saveStock();
        }, function (error) { return _this.errorMessage = error; });
    };
    HomeComponent.prototype.saveStock = function () {
        var _this = this;
        this.stockService.saveStock(this.stock)
            .subscribe(function () {
            _this.stocks.push({
                Name: _this.stock.Name,
                code: _this.stock.Symbol,
                Symbol: _this.stock.Symbol
            });
            _this.loadStockData();
        }, function (error) { return _this.errorMessage = error; });
    };
    HomeComponent.prototype.untrackStock = function (id) {
        var _this = this;
        this.stockService.deleteStock(id)
            .subscribe(function () {
            _this.getStocks();
        }, function (error) { return _this.errorMessage = error; });
    };
    HomeComponent.prototype.initializeGraph = function () {
        var _this = this;
        var snArray = this.stockNames;
        //const snNames = ["AAPL", "MSFT", "GOOG", "TWTR"];
        var seriesOptions = [];
        var seriesCounter = 0;
        var names = snArray;
        // Highcharts
        names.forEach(function (name, i) {
            _this.jsonp
                .request('https://www.highcharts.com/samples/data/jsonp.php?filename=' + name.toLowerCase() + '-c.json&callback=JSONP_CALLBACK')
                .map(function (data) {
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
                                formatter: function () {
                                    return this.value > 0 ? ' + ' : '' + this.value + '%';
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
                }
            });
        });
    };
    __decorate([
        core_1.ViewChild('graph'),
        __metadata("design:type", core_1.ElementRef)
    ], HomeComponent.prototype, "graph", void 0);
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'app-home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.css']
        }),
        __metadata("design:paramtypes", [http_1.Jsonp, stock_service_1.StockService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map