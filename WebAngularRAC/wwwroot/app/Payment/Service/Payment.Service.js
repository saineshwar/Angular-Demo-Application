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
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
var Observable_1 = require("rxjs/Observable");
var PaymentService = (function () {
    function PaymentService(_http) {
        this._http = _http;
        this.token = "";
        this.username = "";
        this.data = JSON.parse(localStorage.getItem('currentUser'));
        this.token = this.data.token;
        this.username = this.data.username;
        this.actionGetUrl = 'http://localhost:56483/api/Payment';
    }
    PaymentService.prototype.MakePayment = function (paymentmodel) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        headers.append('Token', "" + this.token);
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post('http://localhost:56483/api/Payment', paymentmodel, options)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    PaymentService.prototype.GetAllPayedBooking = function () {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        headers.append('Token', "" + this.token);
        var UsernameModel = { "Username": "" + this.username };
        var options = new http_1.RequestOptions({ headers: headers });
        this.actionGetUrl = "http://localhost:56483/api/GetAllPayedBooking";
        return this._http.post(this.actionGetUrl, UsernameModel, options)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    PaymentService.prototype.handleError = function (err) {
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
    return PaymentService;
}());
PaymentService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], PaymentService);
exports.PaymentService = PaymentService;
//# sourceMappingURL=Payment.Service.js.map