import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { CarImageModel } from '../CarImage.Model';

@Injectable()
export class CarImagesService
{
    private actionUrl: string;
    private actionGetUrl: string;
    private actionPutUrl: string;
    private token: string = "";
    private username: string = "";
    private data: any;


    constructor(private _http: Http, private _Route: Router) {
        this.actionUrl = 'http://localhost:56483/api/GetCarImages';
    }


    public GetAllCarsDetails = (): Observable<any> =>
    {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.get(this.actionUrl, options)
            .map((response: Response) => <any>response.json())
            .catch(response => {
                if (response.status === 401) {
                    this._Route.navigate(['Login']);
                }
                return response;
            });
    }

}