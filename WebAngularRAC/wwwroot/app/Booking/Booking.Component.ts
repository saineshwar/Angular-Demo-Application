import { Component, OnInit } from '@angular/core';
import { BookingModel } from '../Booking/BookingModel';
import { CarService } from '../Cars/Services/Car.Service';
import { BookingService } from '../Booking/Services/Booking.Service';
import { CarModel } from '../Cars/Car.Model';
import { Router } from '@angular/router';
import { NgProgressService } from "ng2-progressbar";
@Component({
    templateUrl: 'app/Booking/Booking.html',
    providers: [CarService, BookingService]
})

export class BookingComponent implements OnInit {
    bookingmodel: BookingModel = new BookingModel();
    CarData: CarModel[];
    selectedCar: number;
    private username: string = "";
    private data: any;
    private responsedata: any;

    constructor(private _bookingservice: BookingService, private pService: NgProgressService, private _Route: Router) {
        this.data = JSON.parse(localStorage.getItem('currentUser'));
        this.username = this.data.username

    }

    ngOnInit() {
        this._bookingservice
            .GetAllCarsDetails()
            .subscribe
            (
            data => {
                if (data != null)
                {
                    this.CarData = data;
                }
            },
            error => {
                if (error) {
                    alert("An Error has occured please try again after some time !");
                }
            });

        this._bookingservice.GetUserDetails()
            .subscribe
            (
            data => {
                if (data != null) {
                    this.bookingmodel.Name = data.Username;
                    this.bookingmodel.Email_Id = data.Email;
                    this.bookingmodel.Contact_No = data.Contact_No;
                }
            },
            error => {
                if (error) {
                    alert("An Error has occured please try again after some time !");
                }
            });

    }

    myFunc(val: any) {

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
    }

    onSubmit() {
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
        this._bookingservice.Book(formdata).subscribe
            (
            data => {
                this.responsedata = data;

                if (this.responsedata == "Invalid")
                {
                    alert("Session Expired");
                    this._Route.navigate(['Login']);
                }
                else if (this.responsedata.data == "AlreadyBooked") {
                    alert("Car Slot is Already Booked");
                }
                else if (this.responsedata.data == "InvalidTime") {
                    alert("Choose Valid Dates");
                }
                else if (this.responsedata.data == "Invalidbooktime") {
                    alert("Choose Valid Dates");
                }
                else {
                    alert("Booking Done Successfully ");
                    this._Route.navigate(['Payment', this.responsedata.data]);
                }
            },
            error => {
                if (error) {
                    alert("An Error has occured please try again after some time !");
                }
            });
    }
}