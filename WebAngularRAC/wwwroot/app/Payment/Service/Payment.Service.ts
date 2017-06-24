import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { PaymentModel } from '../Payment.Model';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class PaymentService 
{
    private actionGetUrl: string;
    private actionPutUrl: string;
    private token: string = "";
    private username: string = "";
    private data: any;

    constructor(private _http: Http , private _Route: Router)
    {
        this.data = JSON.parse(localStorage.getItem('currentUser'));
        this.token = this.data.token;
        this.username = this.data.username
        this.actionGetUrl = 'http://localhost:56483/api/Payment';
    }

    public MakePayment(paymentmodel: PaymentModel)
    {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Token', `${this.token}`);
        let options = new RequestOptions({ headers: headers });
        return this._http.post('http://localhost:56483/api/Payment', paymentmodel, options)
            .map((res: Response) => res.json())
            .catch(response => {
                if (response.status === 401)
                {
                    this._Route.navigate(['Login']);
                }
                return response;
            });
    }

    public GetAllPayedBooking()
    {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Token', `${this.token}`);
        let UsernameModel = { "Username": `${this.username}` };
        let options = new RequestOptions({ headers: headers });

        this.actionGetUrl = "http://localhost:56483/api/GetAllPayedBooking";
        return this._http.post(this.actionGetUrl, UsernameModel, options)
            .map((response: Response) => <any>response.json())
            .catch(response => {
                if (response.status === 401) {
                    this._Route.navigate(['Login']);
                }
                return response;
            });
    }

    private handleError(err: any)
    {
        let errorMessage: string;
        if (err instanceof Response)
        {
            let body = err.json() || '';
            let error = body.error || JSON.stringify(body);
            errorMessage = `${err.status} - ${err.statusText} || ''} ${error}`;
        }
        else
        {
            errorMessage = err.message ? err.message : err.toString();
        }

        return Observable.throw(errorMessage);
    }
}