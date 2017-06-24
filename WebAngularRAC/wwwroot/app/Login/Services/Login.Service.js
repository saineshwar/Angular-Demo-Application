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
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
var LoginService = (function () {
    function LoginService(_http) {
        this._http = _http;
    }
    LoginService.prototype.validateLoginUser = function (loginmodel) {
        var _this = this;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post('http://localhost:56483/api/ValidateLoginUser', loginmodel, options).
            map(function (response) {
            var webreposnse = response.json() && response.json();
            if (webreposnse != null) {
                if (webreposnse.UserTypeID == "2") {
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: loginmodel.Username, token: webreposnse.Token }));
                }
                else if (webreposnse.UserTypeID == "1") {
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('AdminUser', JSON.stringify({ username: loginmodel.Username, token: webreposnse.Token }));
                }
                // return true to indicate successful login
                return webreposnse;
            }
            else {
                // return false to indicate failed login
                return null;
            }
        }).catch(function (response) {
            if (response.status === 401) {
                _this._Route.navigate(['Login']);
            }
            return response;
        });
    };
    LoginService.prototype.LogoutUser = function () {
        localStorage.removeItem('currentUser');
    };
    LoginService.prototype.handleError = function (err) {
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
    return LoginService;
}());
LoginService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], LoginService);
exports.LoginService = LoginService;
//# sourceMappingURL=Login.Service.js.map