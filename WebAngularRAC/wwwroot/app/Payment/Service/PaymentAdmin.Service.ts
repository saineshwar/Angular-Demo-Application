import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { PaymentModel } from '../Payment.Model'
@Injectable()
export class PaymentAdminService
{
    private actionGetUrl: string;
    private actionPutUrl: string;
    private token: string = "";
    private username: string = "";
    private data: any;

    constructor(private _http: Http, private _Route: Router)
    {
        this.data = JSON.parse(localStorage.getItem('AdminUser'));
        this.token = this.data.token;
        this.username = this.data.username
        this.actionGetUrl = 'http://localhost:56483/api/Payment';
    }

    public GetAllPayedandCanceledPayment() {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Token', `${this.token}`);
        let UsernameModel = { "Username": `${this.username}` };
        let options = new RequestOptions({ headers: headers });

        this.actionGetUrl = "http://localhost:56483/api/GetAllPaymentAdmin";
        return this._http.post(this.actionGetUrl, UsernameModel, options)
            .map((response: Response) => <any>response.json())
            .catch(response => {
                if (response.status === 401) {
                    this._Route.navigate(['Login']);
                }
                return response;
            });
    }


}