import { Component } from '@angular/core'
import { AdminBookingViewService } from '../Booking/Services/AdminBookingView.Service'
import { Router } from '@angular/router';
import { NgProgressService } from "ng2-progressbar";
import { BookingModel } from '../Booking/BookingModel';

@Component({
    templateUrl: 'app/Booking/AllAdminBookingDetails.html',
    providers: [AdminBookingViewService]
})

export class AdminBookingViewComponent
{
    bookingmodel: BookingModel[];


    constructor(private _bookingservice: AdminBookingViewService, private pService: NgProgressService, private _Route: Router)
    {

    }

    ngOnInit()
    {
        this._bookingservice
            .GetAllBooking()
            .subscribe(data =>
            {
                if (data != null)
                {
                    this.bookingmodel = data;
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


    Delete(BookingID: string)
    {
        if (confirm("Are you sure to delete booking ?"))
        {
            this._bookingservice.DeletingBooking(BookingID)
                .subscribe(data => {
                    if (data != null) {
                        this.bookingmodel = <BookingModel[]>data;
                    }
                },
                error => {
                    if (error) {
                        alert("An Error has occured please try again after some time !");
                    }
                });
        }
    }

}