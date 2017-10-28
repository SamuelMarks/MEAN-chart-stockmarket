"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var stock_service_1 = require("./stock.service");
describe('StockService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [stock_service_1.StockService]
        });
    });
    it('should be created', testing_1.inject([stock_service_1.StockService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=stock.service.spec.js.map