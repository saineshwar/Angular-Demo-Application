import { Component } from '@angular/core'
import { BookingService } from '../Booking/Services/Booking.Service'
import { Router } from '@angular/router';
import { NgProgressService } from "ng2-progressbar";
import { BookingModel } from '../Booking/BookingModel';

@Component({
    templateUrl: 'app/Booking/PendingBookingDetails.html',
    providers: [BookingService]
})
export class PendingBookingComponent {
    bookingmodel: BookingModel[];

    constructor(private _bookingservice: BookingService, private pService: NgProgressService, private _Route: Router) {

    }

    ngOnInit() {
        this._bookingservice
            .GetAllPendingBookingDetails()
            .subscribe(data =>
            {
                if (data != null)
                {
                    this.bookingmodel = data;
                }
            },
            error =>
            {
                if (error) {
                    alert("An Error has occured please try again after some time !");
                }
            });
    }

    Delete(ID :any)
    {
        if (confirm("Are you sure to delete booking ?"))
        {
            this._bookingservice.DeletingBooking(ID)
                .subscribe(data =>
                {
                    if (data == true)
                    {
                        alert("Your booking done successfully ");
                        this._Route.navigate(['AllBookingDetails']);
                    }
                    else
                    {
                        alert("An Error has occured please try again after some time !");
                    }
                },
                error =>
                {
                    if (error)
                    {
                        alert("An Error has occured please try again after some time !");
                    }
                });
        }
    }

    
}