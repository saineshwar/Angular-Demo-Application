import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { LoginModel } from '../Login.Model';

@Injectable()
export class LoginService {
    public token: string;
    constructor(private _http: Http , private _Route: Router)
    {

    }

    validateLoginUser(loginmodel: LoginModel) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post('http://localhost:56483/api/ValidateLoginUser', loginmodel, options).
            map((response: Response) => {
                let webreposnse = response.json() && response.json();
                if (webreposnse != null) {
                    if (webreposnse.UserTypeID == "2")
                    {
                        // store username and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', JSON.stringify({ username: loginmodel.Username, token: webreposnse.Token }));
                    }
                    else if (webreposnse.UserTypeID == "1")
                    {
                        // store username and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('AdminUser', JSON.stringify({ username: loginmodel.Username, token: webreposnse.Token }));
                    }
                    // return true to indicate successful login
                    return webreposnse;
                } else {
                    // return false to indicate failed login
                    return null;
                }

            }
            ).catch(response =>
            {
                if (response.status === 401) {
                    this._Route.navigate(['Login']);
                }
                return response;
            });
    }

    LogoutUser() {
        localStorage.removeItem('currentUser');
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