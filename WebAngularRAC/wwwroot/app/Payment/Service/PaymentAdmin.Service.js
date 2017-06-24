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
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
var PaymentAdminService = (function () {
    function PaymentAdminService(_http, _Route) {
        this._http = _http;
        this._Route = _Route;
        this.token = "";
        this.username = "";
        this.data = JSON.parse(localStorage.getItem('AdminUser'));
        this.token = this.data.token;
        this.username = this.data.username;
        this.actionGetUrl = 'http://localhost:56483/api/Payment';
    }
    PaymentAdminService.prototype.GetAllPayedandCanceledPayment = function () {
        var _this = this;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        headers.append('Token', "" + this.token);
        var UsernameModel = { "Username": "" + this.username };
        var options = new http_1.RequestOptions({ headers: headers });
        this.actionGetUrl = "http://localhost:56483/api/GetAllPaymentAdmin";
        return this._http.post(this.actionGetUrl, UsernameModel, options)
            .map(function (response) { return response.json(); })
            .catch(function (response) {
            if (response.status === 401) {
                _this._Route.navigate(['Login']);
            }
            return response;
        });
    };
    return PaymentAdminService;
}());
PaymentAdminService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, router_1.Router])
], PaymentAdminService);
exports.PaymentAdminService = PaymentAdminService;
//# sourceMappingURL=PaymentAdmin.Service.js.map