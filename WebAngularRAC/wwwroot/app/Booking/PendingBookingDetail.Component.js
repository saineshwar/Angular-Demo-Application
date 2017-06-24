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
var router_1 = require("@angular/router");
var ng2_progressbar_1 = require("ng2-progressbar");
var PendingBookingComponent = (function () {
    function PendingBookingComponent(_bookingservice, pService, _Route) {
        this._bookingservice = _bookingservice;
        this.pService = pService;
        this._Route = _Route;
    }
    PendingBookingComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._bookingservice
            .GetAllPendingBookingDetails()
            .subscribe(function (data) {
            if (data != null) {
                _this.bookingmodel = data;
            }
        }, function (error) {
            if (error) {
                alert("An Error has occured please try again after some time !");
            }
        });
    };
    PendingBookingComponent.prototype.Delete = function (ID) {
        var _this = this;
        if (confirm("Are you sure to delete booking ?")) {
            this._bookingservice.DeletingBooking(ID)
                .subscribe(function (data) {
                if (data == true) {
                    alert("Your booking done successfully ");
                    _this._Route.navigate(['AllBookingDetails']);
                }
                else {
                    alert("An Error has occured please try again after some time !");
                }
            }, function (error) {
                if (error) {
                    alert("An Error has occured please try again after some time !");
                }
            });
        }
    };
    return PendingBookingComponent;
}());
PendingBookingComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/Booking/PendingBookingDetails.html',
        providers: [Booking_Service_1.BookingService]
    }),
    __metadata("design:paramtypes", [Booking_Service_1.BookingService, ng2_progressbar_1.NgProgressService, router_1.Router])
], PendingBookingComponent);
exports.PendingBookingComponent = PendingBookingComponent;
//# sourceMappingURL=PendingBookingDetail.Component.js.map