import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { UserMasterModel } from '../UserMaster.Model';


@Injectable()
export class UserRegistrationService {

   
    constructor(private _http: Http)
    {
       

     
    }

    createUser(Userregistrationmodel: UserMasterModel)
    {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post('http://localhost:56483/api/UserRegistration', Userregistrationmodel, options).map((res: Response) => res.json());
    }

    validateUsername(Username: string)
    {
        let UsernameModel = { "Username": Username };
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post('http://localhost:56483/api/ValidateUsername', UsernameModel, options).map((res: Response) => res.json());
    }



}