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
var Booking_Service_1 = require("../Booking/Services/Booking.Service");
var ng2_progressbar_1 = require("ng2-progressbar");
var router_1 = require("@angular/router");
var Car_Service_1 = require("../Cars/Services/Car.Service");
var DeleteBooking = (function () {
    function DeleteBooking(pService, _carservice, _Route, _bookingservice, _routeParams) {
        this.pService = pService;
        this._carservice = _carservice;
        this._Route = _Route;
        this._bookingservice = _bookingservice;
        this._routeParams = _routeParams;
    }
    DeleteBooking.prototype.ngOnInit = function () {
        var _this = this;
        this.ID = this._routeParams.snapshot.params['ID'];
        this._bookingservice.GetBookingbyBookID(this.ID)
            .subscribe(function (data) {
            if (data != null) {
                _this.bookingmodel = data;
            }
        }, function (error) {
            if (error) {
                alert("An Error has occured please try again after some time !");
            }
        });
        this._carservice
            .GetAllCarsDetails()
            .subscribe(function (data) { return _this.CarData = data; }, function (error) { return console.log(error); }, function () { return console.log('Get all complete'); });
    };
    DeleteBooking.prototype.onSubmit = function () {
        var _this = this;
        if (confirm("Are you sure to delete booking ?")) {
            this._bookingservice.DeletingBooking(this.ID)
                .subscribe(function (data) {
                if (data != null) {
                    _this.bookingmodel = data;
                }
            }, function (error) {
                if (error) {
                    alert("An Error has occured please try again after some time !");
                }
            });
        }
    };
    return DeleteBooking;
}());
DeleteBooking = __decorate([
    core_1.Component({
        templateUrl: 'app/Booking/DeleteBooking.html',
        providers: [Booking_Service_1.BookingService, Car_Service_1.CarService]
    }),
    __metadata("design:paramtypes", [ng2_progressbar_1.NgProgressService, Car_Service_1.CarService, router_1.Router, Booking_Service_1.BookingService, router_1.ActivatedRoute])
], DeleteBooking);
exports.DeleteBooking = DeleteBooking;
//# sourceMappingURL=DeleteBooking.Component.js.map