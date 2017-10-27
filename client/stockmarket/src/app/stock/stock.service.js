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
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var StockService = /** @class */ (function () {
    /**
     * Creates a new StockService with the injected Http.
     * @param {Http} http - The injected Http.
     * @param {Jsonp} jsonp - The injected JsonP.
     * @constructor
     */
    function StockService(http, jsonp) {
        this.http = http;
        this.jsonp = jsonp;
    }
    StockService.prototype.getStockDetail = function (code) {
        //const url = "http://dev.markitondemand.com/MODApis/Api/v2/Quote/jsonp?symbol=AAPL&callback=JSONP_CALLBACK";
        var url = "http://dev.markitondemand.com/MODApis/Api/v2/Quote/jsonp?symbol=" + code + "&callback=JSONP_CALLBACK";
        return this.jsonp.request(url, { method: 'Get' })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    StockService.prototype.getStockHistoric = function (code) {
        var apiString = "http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/jsonp?parameters=%7B%22Normalized%22%3Afalse%2C%22NumberOfDays%22%3A365%2C%22DataPeriod%22%3A%22Day%22%2C%22Elements%22%3A%5B%7B%22Symbol%22%3A%22AAPL%22%2C%22Type%22%3A%22price%22%2C%22Params%22%3A%5B%22c%22%5D%7D%5D%7D&callback=JSONP_CALLBACK";
        //const apiString = "http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/json?parameters=%7B%22Normalized%22%3Afalse%2C%22NumberOfDays%22%3A365%2C%22DataPeriod%22%3A%22Day%22%2C%22Elements%22%3A%5B%7B%22Symbol%22%3A%22" + code + "%22%2C%22Type%22%3A%22price%22%2C%22Params%22%3A%5B%22c%22%5D%7D%5D%7D";
        console.log("Getting stock detail from api with code of: ", code);
        return this.jsonp.request(apiString, { method: 'Get' })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    StockService.prototype.getStocks = function () {
        return this.http.get('/api/stocks/')
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    StockService.prototype.saveStock = function (stock) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        return this.http.post('/api/stocks/', JSON.stringify(stock), { headers: headers })
            .map(function (res) { return res.json().data; });
    };
    StockService.prototype.deleteStock = function (id) {
        return this.http.delete('/api/stocks/' + id)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    /**
     * Handle HTTP error
     */
    StockService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    };
    StockService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, http_1.Jsonp])
    ], StockService);
    return StockService;
}());
exports.StockService = StockService;
//# sourceMappingURL=stock.service.js.map