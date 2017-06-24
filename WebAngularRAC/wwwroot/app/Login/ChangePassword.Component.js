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
var ChangePassword_Model_1 = require("../Login/ChangePassword.Model");
var Changepassword_Service_1 = require("../Login/Services/Changepassword.Service");
var ChangePasswordComponent = (function () {
    function ChangePasswordComponent(_service, _Route) {
        this._service = _service;
        this._Route = _Route;
        this.changepasswordmodel = new ChangePassword_Model_1.ChangePasswordModel;
    }
    ChangePasswordComponent.prototype.onSubmit = function () {
        var _this = this;
        var formdata = this.changepasswordmodel;
        if (formdata.OldPassword == "") {
            return alert("OldPassword Required");
        }
        else if (formdata.NewPassword == "") {
            return alert("NewPassword Required");
        }
        else if (formdata.ConfirmPassword == "") {
            return alert("ConfirmPassword Required");
        }
        else {
            this._service.ChangeUserPassword(this.changepasswordmodel).
                subscribe(function (data) {
                _this.response = data;
                if (_this.response) {
                    alert("Your Password has been changed Successfully");
                    _this._Route.navigate(['UserDashboard']);
                }
                else {
                    alert("An Error has occured please try again after some time !");
                    _this._Route.navigate(['UserDashboard']);
                }
            }, function (err) {
                if (err) {
                    alert("An Error has occured please try again after some time !");
                }
            });
        }
    };
    return ChangePasswordComponent;
}());
ChangePasswordComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/Login/ChangePassword.html',
        providers: [Changepassword_Service_1.ChangePasswordService]
    }),
    __metadata("design:paramtypes", [Changepassword_Service_1.ChangePasswordService, router_1.Router])
], ChangePasswordComponent);
exports.ChangePasswordComponent = ChangePasswordComponent;
//# sourceMappingURL=ChangePassword.Component.js.map