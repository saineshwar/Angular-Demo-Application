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
var Car_Model_1 = require("../Cars/Car.Model");
var Car_Service_1 = require("../Cars/Services/Car.Service");
var ng2_progressbar_1 = require("ng2-progressbar");
var router_1 = require("@angular/router");
var EditCarComponent = (function () {
    function EditCarComponent(pService, _Route, _carservice, _routeParams) {
        this.pService = pService;
        this._Route = _Route;
        this._carservice = _carservice;
        this._routeParams = _routeParams;
        this.carmodel = new Car_Model_1.CarModel();
        this.username = "";
        this.data = JSON.parse(localStorage.getItem('AdminUser'));
        this.username = this.data.username;
    }
    EditCarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ID = this._routeParams.snapshot.params['ID'];
        if (this.ID != null) {
            this._carservice.EditCar(this.ID)
                .subscribe(function (data) {
                _this.carmodel = data;
            }, function (error) {
                if (error) {
                    alert("An Error has occured please try again after some time !");
                }
            });
        }
    };
    EditCarComponent.prototype.onSubmit = function () {
        var _this = this;
        var formdata = this.carmodel;
        formdata.Username = this.username;
        this._carservice.UpdateCar(formdata).subscribe(function (data) {
            if (data == true) {
                alert("Your Data Update Successfully ");
                _this._Route.navigate(['AllCar']);
            }
            else {
                alert("Problem While Adding Cars");
            }
        }, function (error) {
            if (error) {
                alert("An Error has occured please try again after some time !");
            }
        });
    };
    return EditCarComponent;
}());
EditCarComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/Cars/EditCar.html',
        providers: [Car_Service_1.CarService]
    }),
    __metadata("design:paramtypes", [ng2_progressbar_1.NgProgressService, router_1.Router, Car_Service_1.CarService, router_1.ActivatedRoute])
], EditCarComponent);
exports.EditCarComponent = EditCarComponent;
//# sourceMappingURL=EditCar.Component.js.map