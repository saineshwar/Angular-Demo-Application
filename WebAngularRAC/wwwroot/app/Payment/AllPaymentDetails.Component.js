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
var Payment_Service_1 = require("../Payment/Service/Payment.Service");
var router_1 = require("@angular/router");
var ng2_progressbar_1 = require("ng2-progressbar");
var AllPaymentDetails = (function () {
    function AllPaymentDetails(_bookingservice, _paymentservice, pService, _Route) {
        this._bookingservice = _bookingservice;
        this._paymentservice = _paymentservice;
        this.pService = pService;
        this._Route = _Route;
    }
    AllPaymentDetails.prototype.ngOnInit = function () {
        var _this = this;
        this._paymentservice
            .GetAllPayedBooking()
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
    return AllPaymentDetails;
}());
AllPaymentDetails = __decorate([
    core_1.Component({
        templateUrl: 'app/Payment/AllPaymentDetails.html',
        providers: [Booking_Service_1.BookingService, Payment_Service_1.PaymentService]
    }),
    __metadata("design:paramtypes", [Booking_Service_1.BookingService, Payment_Service_1.PaymentService, ng2_progressbar_1.NgProgressService, router_1.Router])
], AllPaymentDetails);
exports.AllPaymentDetails = AllPaymentDetails;
//# sourceMappingURL=AllPaymentDetails.Component.js.map