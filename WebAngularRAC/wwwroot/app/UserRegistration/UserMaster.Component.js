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
var UserMaster_Model_1 = require("../UserRegistration/UserMaster.Model");
var UserRegistration_Service_1 = require("../UserRegistration/Services/UserRegistration.Service");
var ng2_progressbar_1 = require("ng2-progressbar");
var router_1 = require("@angular/router");
var UserMasterComponent = (function () {
    function UserMasterComponent(pService, _Route, _UserRegistrationService) {
        this.pService = pService;
        this._Route = _Route;
        this._UserRegistrationService = _UserRegistrationService;
        this.UserMasterModel = new UserMaster_Model_1.UserMasterModel();
        this.responseStatus = [];
    }
    UserMasterComponent.prototype.onSubmit = function () {
        var _this = this;
        this.pService.start();
        var formdata = this.UserMasterModel;
        var UserBirthdate = this.UserMasterModel.BirthdateView.date;
        var SelectedBirthdate = UserBirthdate.year + "-" + UserBirthdate.month + "-" + UserBirthdate.day;
        formdata.Username = this.UserMasterModel.Username;
        formdata.Password = this.UserMasterModel.Password;
        formdata.Address = this.UserMasterModel.Address;
        formdata.Birthdate = SelectedBirthdate;
        formdata.Contact_No = this.UserMasterModel.Contact_No;
        formdata.Email = this.UserMasterModel.Email;
        this._UserRegistrationService.createUser(formdata).subscribe(function (data) {
            if (data == true) {
                alert("Your Registration has done Successfully ");
                _this._Route.navigate(['Login']);
            }
            else {
                alert("Problem While Registering User");
            }
        }, function (err) {
            if (err) {
                alert("An Error has occured please try again after some time !");
            }
        });
        this.pService.done();
    };
    UserMasterComponent.prototype.CheckUsernameExist = function () {
        var _this = this;
        var registration = this.UserMasterModel;
        if (registration.Username != null) {
            this._UserRegistrationService.validateUsername(registration.Username).subscribe(function (data) {
                _this.status = data;
                if (_this.status == false) {
                    _this.UserMasterModel.Username = "";
                    alert("Username Already Exits");
                }
                else {
                }
            }, function (err) {
                if (err) {
                    alert("An Error has occured please try again after some time !");
                }
            });
        }
    };
    return UserMasterComponent;
}());
UserMasterComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/UserRegistration/UserRegistration.html',
        providers: [UserRegistration_Service_1.UserRegistrationService]
    }),
    __metadata("design:paramtypes", [ng2_progressbar_1.NgProgressService, router_1.Router, UserRegistration_Service_1.UserRegistrationService])
], UserMasterComponent);
exports.UserMasterComponent = UserMasterComponent;
//# sourceMappingURL=UserMaster.Component.js.map