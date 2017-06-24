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
var Login_Model_1 = require("../Login/Login.Model");
var Login_Service_1 = require("../Login/Services/Login.Service");
var ng2_progressbar_1 = require("ng2-progressbar");
var router_1 = require("@angular/router");
var LoginComponent = (function () {
    function LoginComponent(pService, _Route, _LoginService) {
        this.pService = pService;
        this._Route = _Route;
        this._LoginService = _LoginService;
        this.LoginModel = new Login_Model_1.LoginModel();
        localStorage.removeItem('currentUser');
        localStorage.removeItem('AdminUser');
    }
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        this.pService.start();
        var loginmodel = this.LoginModel;
        this._LoginService.validateLoginUser(this.LoginModel).subscribe(function (data) {
            _this.webresponse = data;
            if (_this.webresponse.UserTypeID == "0") {
                alert("Invalid Username and Password");
                _this._Route.navigate(['Login']);
            }
            else {
                if (_this.webresponse.UserTypeID == "2") {
                    alert("Logged in Successfully");
                    _this._Route.navigate(['UserDashboard']);
                }
                else {
                    alert("Logged in Successfully");
                    _this._Route.navigate(['AdminDashboard']);
                }
            }
        }, function (err) {
            if (err) {
                alert("An Error has occured please try again after some time !");
            }
        });
        this.pService.done();
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/Login/Login.html',
        styleUrls: ['../../css/Login.css'],
        providers: [Login_Service_1.LoginService]
    }),
    __metadata("design:paramtypes", [ng2_progressbar_1.NgProgressService, router_1.Router, Login_Service_1.LoginService])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=Login.Component.js.map