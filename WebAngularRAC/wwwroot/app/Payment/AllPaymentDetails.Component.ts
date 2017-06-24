import { Component } from '@angular/core'
import { BookingService } from '../Booking/Services/Booking.Service'
import { PaymentService } from '../Payment/Service/Payment.Service'
import { Router } from '@angular/router';
import { NgProgressService } from "ng2-progressbar";
import { BookingModel } from '../Booking/BookingModel';

@Component({
    templateUrl: 'app/Payment/AllPaymentDetails.html',
    providers: [BookingService, PaymentService]
})

export class AllPaymentDetails
{
    bookingmodel: BookingModel[];


    constructor(private _bookingservice: BookingService, private _paymentservice: PaymentService, private pService: NgProgressService, private _Route: Router) {

    }

    ngOnInit() {
        this._paymentservice
            .GetAllPayedBooking()
            .subscribe(data =>
            {
                if (data != null)
                {
                    this.bookingmodel = <BookingModel[]>data;
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