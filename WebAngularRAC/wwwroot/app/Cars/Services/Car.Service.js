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
var CarService = (function () {
    function CarService(_http, _Route) {
        var _this = this;
        this._http = _http;
        this._Route = _Route;
        this.token = "";
        this.username = "";
        this.GetAllCarsDetails = function () {
            var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
            headers.append('Token', "" + _this.token);
            var options = new http_1.RequestOptions({ headers: headers });
            return _this._http.get(_this.actionUrl, options)
                .map(function (response) { return response.json(); })
                .catch(function (response) {
                if (response.status === 401) {
                    _this._Route.navigate(['Login']);
                }
                return response;
            });
        };
        this.actionUrl = 'http://localhost:56483/api/Cars';
        this.data = JSON.parse(localStorage.getItem('AdminUser'));
        this.token = this.data.token;
        this.username = this.data.username;
    }
    CarService.prototype.AddCar = function (carmodel) {
        var _this = this;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        headers.append('Token', "" + this.token);
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post('http://localhost:56483/api/Cars', carmodel, options)
            .map(function (res) { return res.json(); })
            .catch(function (response) {
            if (response.status === 401) {
                _this._Route.navigate(['Login']);
            }
            return response;
        });
    };
    CarService.prototype.validateModelName = function (Model_Name) {
        var _this = this;
        var UsernameModel = { "Model_Name": Model_Name };
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        headers.append('Token', "" + this.token);
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post('http://localhost:56483/api/ValidateModelName', UsernameModel, options)
            .map(function (res) { return res.json(); })
            .catch(function (response) {
            if (response.status === 401) {
                _this._Route.navigate(['Login']);
            }
            return response;
        });
    };
    CarService.prototype.EditCar = function (CarID) {
        var _this = this;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        headers.append('Token', "" + this.token);
        var options = new http_1.RequestOptions({ headers: headers });
        this.actionGetUrl = "http://localhost:56483/api/Cars/" + CarID;
        return this._http.get(this.actionGetUrl, options)
            .map(function (response) { return response.json(); })
            .catch(function (response) {
            if (response.status === 401) {
                _this._Route.navigate(['Login']);
            }
            return response;
        });
    };
    CarService.prototype.UpdateCar = function (carmodel) {
        var _this = this;
        this.actionPutUrl = "http://localhost:56483/api/Cars/" + carmodel.C_Id;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        headers.append('Token', "" + this.token);
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.put(this.actionGetUrl, carmodel, options).map(function (res) { return res.json(); })
            .catch(function (response) {
            if (response.status === 401) {
                _this._Route.navigate(['Login']);
            }
            return response;
        });
    };
    return CarService;
}());
CarService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, router_1.Router])
], CarService);
exports.CarService = CarService;
//# sourceMappingURL=Car.Service.js.map