import { Component } from '@angular/core'
import { BookingService } from '../Booking/Services/Booking.Service'
import { Router } from '@angular/router';
import { NgProgressService } from "ng2-progressbar";
import { BookingModel } from '../Booking/BookingModel';



@Component({
    templateUrl: 'app/Booking/AllBookingDetails.html',
    providers: [BookingService]
})

export class AllBookingDetails
{
    bookingmodel: BookingModel[];


    constructor(private _bookingservice: BookingService, private pService: NgProgressService, private _Route: Router)
    {

    }

    ngOnInit()
    {
        this._bookingservice
            .GetAllBookingDetails()
            .subscribe(data => this.bookingmodel = data,
            error =>
            {
                if (error) {
                    alert("An Error has occured please try again after some time !");
                }
            });
    }

   

}