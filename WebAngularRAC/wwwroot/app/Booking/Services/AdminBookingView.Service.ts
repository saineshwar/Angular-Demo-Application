import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { BookingModel } from '../BookingModel';
import { BookingCommonModel } from '../Booking.Common.Model';

@Injectable()
export class AdminBookingViewService {
    private actionUrl: string;
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
    }


    public GetAllBooking = (): Observable<any> =>
    {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Token', `${this.token}`);
        let options = new RequestOptions({ headers: headers });
        return this._http.get('http://localhost:56483/api/AllBookingList', options)
            .map((response: Response) => <any>response.json())
            .catch(response =>
            {
                if (response.status === 401) {
                    this._Route.navigate(['Login']);
                }
                return response;
            });
    }

    public DeletingBooking(BookingID: string)
    {
        let deletemodel = { "Username": `${this.username}`, "id": BookingID };
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Token', `${this.token}`);
        let options = new RequestOptions({ headers: headers });
        this.actionGetUrl = "http://localhost:56483/api/DeletingBookingAdmin";
        return this._http.post(this.actionGetUrl, deletemodel, options)
            .map((response: Response) => <any>response.json()).catch(response =>
            {
                if (response.status === 401)
                {
                    this._Route.navigate(['Login']);
                }
                return response;
            });
    }

    private handleError(err: any)
    {
        let errorMessage: string;
        if (err instanceof Response) {
            let body = err.json() || '';
            let error = body.error || JSON.stringify(body);
            errorMessage = `${err.status} - ${err.statusText} || ''} ${error}`;
        }
        else {
            errorMessage = err.message ? err.message : err.toString();
        }

        return Observable.throw(errorMessage);
    }
}