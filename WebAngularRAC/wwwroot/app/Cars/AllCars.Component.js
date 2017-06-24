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
var Car_Service_1 = require("../Cars/Services/Car.Service");
var ng2_progressbar_1 = require("ng2-progressbar");
var AllCarsComponent = (function () {
    function AllCarsComponent(pService, _carservice) {
        this.pService = pService;
        this._carservice = _carservice;
    }
    AllCarsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.pService.start();
        this._carservice
            .GetAllCarsDetails()
            .subscribe(function (data) {
            _this.CarData = data;
            _this.pService.done();
        }, function (error) {
            if (error) {
                alert("An Error has occured please try again after some time !");
            }
        });
    };
    return AllCarsComponent;
}());
AllCarsComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/Cars/AllCars.html',
        providers: [Car_Service_1.CarService]
    }),
    __metadata("design:paramtypes", [ng2_progressbar_1.NgProgressService, Car_Service_1.CarService])
], AllCarsComponent);
exports.AllCarsComponent = AllCarsComponent;
//# sourceMappingURL=AllCars.Component.js.map