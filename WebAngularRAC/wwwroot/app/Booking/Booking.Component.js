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
var BookingModel_1 = require("../Booking/BookingModel");
var Car_Service_1 = require("../Cars/Services/Car.Service");
var Booking_Service_1 = require("../Booking/Services/Booking.Service");
var router_1 = require("@angular/router");
var ng2_progressbar_1 = require("ng2-progressbar");
var BookingComponent = (function () {
    function BookingComponent(_bookingservice, pService, _Route) {
        this._bookingservice = _bookingservice;
        this.pService = pService;
        this._Route = _Route;
        this.bookingmodel = new BookingModel_1.BookingModel();
        this.username = "";
        this.data = JSON.parse(localStorage.getItem('currentUser'));
        this.username = this.data.username;
    }
    BookingComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._bookingservice
            .GetAllCarsDetails()
            .subscribe(function (data) {
            if (data != null) {
                _this.CarData = data;
            }
        }, function (error) {
            if (error) {
                alert("An Error has occured please try again after some time !");
            }
        });
        this._bookingservice.GetUserDetails()
            .subscribe(function (data) {
            if (data != null) {
                _this.bookingmodel.Name = data.Username;
                _this.bookingmodel.Email_Id = data.Email;
                _this.bookingmodel.Contact_No = data.Contact_No;
            }
        }, function (error) {
            if (error) {
                alert("An Error has occured please try again after some time !");
            }
        });
    };
    BookingComponent.prototype.myFunc = function (val) {
        var date1 = new Date(this.bookingmodel.FromDate);
        var date2 = new Date(this.bookingmodel.ToDate);
        var Day1 = date1.getDay();
        var Month1 = date1.getMonth();
        var FullYear1 = date1.getFullYear();
        var Day2 = date2.getDay();
        var Month2 = date2.getMonth();
        var FullYear2 = date2.getFullYear();
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        var seconds = Math.floor((timeDiff) / (1000));
        if (diffDays < 1 && seconds < 60) {
            this.bookingmodel.FromDate = "";
            this.bookingmodel.ToDate = "";
            alert("Invalid Date for Booking Car / Cannot Book Car Less then an hour");
        }
    };
    BookingComponent.prototype.onSubmit = function () {
        var _this = this;
        var formdata = this.bookingmodel;
        formdata.BookingID = 0;
        formdata.Name = this.bookingmodel.Name;
        formdata.FromDate = this.bookingmodel.FromDate.toString();
        formdata.ToDate = this.bookingmodel.ToDate.toString();
        formdata.S_address = this.bookingmodel.S_address;
        formdata.D_address = this.bookingmodel.D_address;
        formdata.Email_Id = this.bookingmodel.Email_Id;
        formdata.Contact_No = this.bookingmodel.Contact_No;
        formdata.C_Id = this.selectedCar;
        formdata.Amount = 0;
        formdata.Username = this.username;
        this._bookingservice.Book(formdata).subscribe(function (data) {
            _this.responsedata = data;
            if (_this.responsedata == "Invalid") {
                alert("Session Expired");
                _this._Route.navigate(['Login']);
            }
            else if (_this.responsedata.data == "AlreadyBooked") {
                alert("Car Slot is Already Booked");
            }
            else if (_this.responsedata.data == "InvalidTime") {
                alert("Choose Valid Dates");
            }
            else if (_this.responsedata.data == "Invalidbooktime") {
                alert("Choose Valid Dates");
            }
            else {
                alert("Booking Done Successfully ");
                _this._Route.navigate(['Payment', _this.responsedata.data]);
            }
        }, function (error) {
            if (error) {
                alert("An Error has occured please try again after some time !");
            }
        });
    };
    return BookingComponent;
}());
BookingComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/Booking/Booking.html',
        providers: [Car_Service_1.CarService, Booking_Service_1.BookingService]
    }),
    __metadata("design:paramtypes", [Booking_Service_1.BookingService, ng2_progressbar_1.NgProgressService, router_1.Router])
], BookingComponent);
exports.BookingComponent = BookingComponent;
//# sourceMappingURL=Booking.Component.js.map