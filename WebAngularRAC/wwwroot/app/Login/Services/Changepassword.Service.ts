import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ChangePasswordModel } from '../ChangePassword.Model'


@Injectable()
export class ChangePasswordService
{
    private token: string = "";
    private username: string = "";
    private data: any;
    constructor(private _http: Http, private _Route: Router)
    {
        this.data = JSON.parse(localStorage.getItem('currentUser'));
        this.token = this.data.token;
        this.username = this.data.username
    }

    ChangeUserPassword(changepasswordmodel: ChangePasswordModel)
    {
        changepasswordmodel.Username = this.username;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Token', `${this.token}`);
        let options = new RequestOptions({ headers: headers });
        return this._http.post('http://localhost:56483/api/ChangePassword', changepasswordmodel, options)
            .map((response: Response) =>
            {
                let webreposnse = response.json() && response.json();
                if (webreposnse) {
                    return webreposnse;
                }
                else {
                    return false;
                }
            }).catch(response =>
            {
                if (response.status === 401) {
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