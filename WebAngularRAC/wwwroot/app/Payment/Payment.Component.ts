import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../Payment/Service/Payment.Service'
import { BookingService } from '../Booking/Services/Booking.Service'
import { Router, ActivatedRoute } from '@angular/router'
import { BookingModel } from '../Booking/BookingModel';
import { BankService } from '../Bank/Services/Bank.Service'
import { BankTBModel } from '../Bank/BankTB.Model';
import { PaymentModel } from '../Payment/Payment.Model'

@Component({
    templateUrl: 'app/Payment/Payment.html',
    providers: [PaymentService, BookingService, BankService]
})

export class PaymentComponent implements OnInit {
    BookingID: string;
    bookingmodel: BookingModel = new BookingModel;
    banktbmodel: BankTBModel[]
    paymentmodel: PaymentModel = new PaymentModel;
    selectedBank: number;
    disabledtext: boolean = true;
    private username: string = "";
    private data: any;
    webresponse: any;
    constructor(private _paymentservice: PaymentService,
        private _routeParams: ActivatedRoute,
        private _bankservice: BankService,
        private _bookingservice: BookingService,
        private _route: Router
    ) 
    {
        this.data = JSON.parse(localStorage.getItem('currentUser'));
        this.username = this.data.username
    }

    ngOnInit(): void
    {
        this.BookingID = this._routeParams.snapshot.params['ID'];

        this._bookingservice.GetBookingbyBookID(this.BookingID)
            .subscribe(data =>
            {
                if (data != null)
                {
                    this.bookingmodel = <BookingModel>data;
                }
            },
            error =>
            {
                if (error)
                {
                    alert("An Error has occured please try again after some time !");
                }
            });

        this._bankservice.GetBankList().
            subscribe(data =>
            {
                if (data != null)
                {
                    this.banktbmodel = <BankTBModel[]>data;
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

    onSubmit() {
        var formdata = this.bookingmodel;
        var payment = this.paymentmodel;
        payment.BankID = this.selectedBank;
        payment.C_ID = formdata.C_Id;
        payment.Amount = 0;
        payment.UserID = 0;
        payment.BookingID = formdata.BookingID;
        payment.Username = this.username;
        this._paymentservice.MakePayment(payment).subscribe
            (
            data => {
                if (data == true)
                {
                    alert("Your booking done successfully ");
                    this._route.navigate(['AllBookingDetails']);
                }
                else {
                    alert("Problem While Registering User");
                }
            },
            err =>
            {
                if (err)
                {
                    alert("An Error has occured please try again after some time !");
                }
            });

    }


}