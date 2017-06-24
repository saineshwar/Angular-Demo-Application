import { Component, OnInit } from '@angular/core'
import { PaymentAdminService } from '../Payment/Service/PaymentAdmin.Service'
import { NgProgressService } from "ng2-progressbar";
import { PaymentViewModel } from '../Payment/PaymentViewModel';

@Component({
    templateUrl: 'app/Payment/AllPaymentDetailsAdmin.html',
    providers: [PaymentAdminService]
})

export class AllPaymentDetailsAdminComponent implements OnInit {
    paymentviewmodel: PaymentViewModel[];

    constructor(private _paymentservice: PaymentAdminService, private pService: NgProgressService) {

    }

    ngOnInit() {
        this._paymentservice
            .GetAllPayedandCanceledPayment()
            .subscribe(data => this.paymentviewmodel = <PaymentViewModel[]>data,
            err => {
                if (err) {
                    alert("An Error has occured please try again after some time !");
                }
            });
    }



}