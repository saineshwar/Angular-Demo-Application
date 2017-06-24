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
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var BankService = (function () {
    function BankService(_http, _Route) {
        this._http = _http;
        this._Route = _Route;
    }
    BankService.prototype.GetBankList = function () {
        var _this = this;
        this.actionGetUrl = "http://localhost:56483/api/BankList/";
        return this._http.get(this.actionGetUrl)
            .map(function (response) { return response.json(); }).catch(function (response) {
            if (response.status === 401) {
                _this._Route.navigate(['Login']);
            }
            return response;
        });
    };
    BankService.prototype.handleError = function (err) {
        var errorMessage;
        if (err instanceof http_1.Response) {
            var body = err.json() || '';
            var error = body.error || JSON.stringify(body);
            errorMessage = err.status + " - " + err.statusText + " || ''} " + error;
        }
        else {
            errorMessage = err.message ? err.message : err.toString();
        }
        return Observable_1.Observable.throw(errorMessage);
    };
    return BankService;
}());
BankService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, router_1.Router])
], BankService);
exports.BankService = BankService;
//# sourceMappingURL=Bank.Service.js.map