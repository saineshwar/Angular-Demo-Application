import { Injectable } from '@angular/core'
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BankService
{
    private actionGetUrl: string;

    constructor(private _http: Http, private _Route: Router) {

    }

    public GetBankList()
    {
        this.actionGetUrl = "http://localhost:56483/api/BankList/";
        return this._http.get(this.actionGetUrl)
            .map((response: Response) => <any>response.json()).catch(response => {
                if (response.status === 401) {
                    this._Route.navigate(['Login']);
                }
                return response;
            });
    }


    private handleError(err: any) {
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