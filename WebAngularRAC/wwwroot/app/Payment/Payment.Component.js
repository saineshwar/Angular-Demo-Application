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
var Payment_Service_1 = require("../Payment/Service/Payment.Service");
var Booking_Service_1 = require("../Booking/Services/Booking.Service");
var router_1 = require("@angular/router");
var BookingModel_1 = require("../Booking/BookingModel");
var Bank_Service_1 = require("../Bank/Services/Bank.Service");
var Payment_Model_1 = require("../Payment/Payment.Model");
var PaymentComponent = (function () {
    function PaymentComponent(_paymentservice, _routeParams, _bankservice, _bookingservice, _route) {
        this._paymentservice = _paymentservice;
        this._routeParams = _routeParams;
        this._bankservice = _bankservice;
        this._bookingservice = _bookingservice;
        this._route = _route;
        this.bookingmodel = new BookingModel_1.BookingModel;
        this.paymentmodel = new Payment_Model_1.PaymentModel;
        this.disabledtext = true;
        this.username = "";
        this.data = JSON.parse(localStorage.getItem('currentUser'));
        this.username = this.data.username;
    }
    PaymentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.BookingID = this._routeParams.snapshot.params['ID'];
        this._bookingservice.GetBookingbyBookID(this.BookingID)
            .subscribe(function (data) {
            if (data != null) {
                _this.bookingmodel = data;
            }
        }, function (error) {
            if (error) {
                alert("An Error has occured please try again after some time !");
            }
        });
        this._bankservice.GetBankList().
            subscribe(function (data) {
            if (data != null) {
                _this.banktbmodel = data;
            }
        }, function (error) {
            if (error) {
                alert("An Error has occured please try again after some time !");
            }
        });
    };
    PaymentComponent.prototype.onSubmit = function () {
        var _this = this;
        var formdata = this.bookingmodel;
        var payment = this.paymentmodel;
        payment.BankID = this.selectedBank;
        payment.C_ID = formdata.C_Id;
        payment.Amount = 0;
        payment.UserID = 0;
        payment.BookingID = formdata.BookingID;
        payment.Username = this.username;
        this._paymentservice.MakePayment(payment).subscribe(function (data) {
            if (data == true) {
                alert("Your booking done successfully ");
                _this._route.navigate(['AllBookingDetails']);
            }
            else {
                alert("Problem While Registering User");
            }
        }, function (err) {
            if (err) {
                alert("An Error has occured please try again after some time !");
            }
        });
    };
    return PaymentComponent;
}());
PaymentComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/Payment/Payment.html',
        providers: [Payment_Service_1.PaymentService, Booking_Service_1.BookingService, Bank_Service_1.BankService]
    }),
    __metadata("design:paramtypes", [Payment_Service_1.PaymentService,
        router_1.ActivatedRoute,
        Bank_Service_1.BankService,
        Booking_Service_1.BookingService,
        router_1.Router])
], PaymentComponent);
exports.PaymentComponent = PaymentComponent;
//# sourceMappingURL=Payment.Component.js.map