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
var BookingService = (function () {
    function BookingService(_http, _Route) {
        var _this = this;
        this._http = _http;
        this._Route = _Route;
        this.token = "";
        this.username = "";
        this.GetUserDetails = function () {
            var UsernameModel = { "Username": "" + _this.username };
            var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
            headers.append('Token', "" + _this.token);
            var options = new http_1.RequestOptions({ headers: headers });
            return _this._http.post('http://localhost:56483/api/UserDetails', UsernameModel, options)
                .map(function (response) { return response.json(); }).catch(function (response) {
                if (response.status === 401) {
                    _this._Route.navigate(['Login']);
                }
                return response;
            });
        };
        this.GetAllBookingDetails = function () {
            var UsernameModel = { "Username": "" + _this.username };
            var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
            headers.append('Token', "" + _this.token);
            var options = new http_1.RequestOptions({ headers: headers });
            return _this._http.post('http://localhost:56483/api/GetAllBookingDetails', UsernameModel, options)
                .map(function (response) { return response.json(); }).catch(function (response) {
                if (response.status === 401) {
                    _this._Route.navigate(['Login']);
                }
                return response;
            });
        };
        this.GetAllCarsDetails = function () {
            var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
            headers.append('Token', "" + _this.token);
            var options = new http_1.RequestOptions({ headers: headers });
            return _this._http.get('http://localhost:56483/api/GetAllCarsDetails', options)
                .map(function (response) { return response.json(); }).catch(function (response) {
                if (response.status === 401) {
                    _this._Route.navigate(['Login']);
                }
                return response;
            });
        };
        this.GetAllPendingBookingDetails = function () {
            var UsernameModel = { "Username": "" + _this.username };
            var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
            headers.append('Token', "" + _this.token);
            var options = new http_1.RequestOptions({ headers: headers });
            return _this._http.post('http://localhost:56483/api/PendingBooking', UsernameModel, options)
                .map(function (response) { return response.json(); })
                .catch(function (response) {
                if (response.status === 401) {
                    _this._Route.navigate(['Login']);
                }
                return response;
            });
        };
        this.actionGetUrl = 'http://localhost:56483/api/Booking';
        this.data = JSON.parse(localStorage.getItem('currentUser'));
        this.token = this.data.token;
        this.username = this.data.username;
    }
    BookingService.prototype.Book = function (bookingmodel) {
        var _this = this;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        headers.append('Token', "" + this.token);
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post('http://localhost:56483/api/Booking', bookingmodel, options)
            .map(function (res) { return res.json(); })
            .catch(function (response) {
            if (response.status === 401) {
                _this._Route.navigate(['Login']);
            }
            return response;
        });
    };
    BookingService.prototype.DeletingBooking = function (BookingID) {
        var _this = this;
        var deletemodel = { "Username": "" + this.username, "id": BookingID };
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        headers.append('Token', "" + this.token);
        var options = new http_1.RequestOptions({ headers: headers });
        this.actionGetUrl = "http://localhost:56483/api/DeletingBookingUser/";
        return this._http.post(this.actionGetUrl, deletemodel, options)
            .map(function (response) { return response.json(); }).catch(function (response) {
            if (response.status === 401) {
                _this._Route.navigate(['Login']);
            }
            return response;
        });
    };
    BookingService.prototype.GetBookingbyBookID = function (BookingID) {
        var _this = this;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        headers.append('Token', "" + this.token);
        var options = new http_1.RequestOptions({ headers: headers });
        this.actionGetUrl = "http://localhost:56483/api/Booking/" + BookingID;
        return this._http.get(this.actionGetUrl, options)
            .map(function (response) { return response.json(); }).catch(function (response) {
            if (response.status === 401) {
                _this._Route.navigate(['Login']);
            }
            return response;
        });
    };
    BookingService.prototype.GetAllPendingBooking = function () {
        var _this = this;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        headers.append('Token', "" + this.token);
        var options = new http_1.RequestOptions({ headers: headers });
        this.actionGetUrl = "http://localhost:56483/api/Payment";
        return this._http.get(this.actionGetUrl, options)
            .map(function (response) { return response.json(); }).catch(function (response) {
            if (response.status === 401) {
                _this._Route.navigate(['Login']);
            }
            return response;
        });
    };
    BookingService.prototype.handleError = function (err) {
        var errorMessage;
        if (err instanceof http_1.Response) {
            var body = err.json() || '';
            var error = body.error || JSON.stringify(body);
            errorMessage = err.status + " - " + err.statusText + " || ''} " + error;
        }
        else {
            errorMessage = err.message ? err.message : err.toString();
        }
        return this._Route.navigate(['Login']);
    };
    return BookingService;
}());
BookingService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, router_1.Router])
], BookingService);
exports.BookingService = BookingService;
//# sourceMappingURL=Booking.Service.js.map