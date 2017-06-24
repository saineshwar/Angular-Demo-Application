import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { CarModel } from '../Car.Model';

@Injectable()
export class CarService {
    private actionUrl: string;
    private actionGetUrl: string;
    private actionPutUrl: string;
    private token: string = "";
    private username: string = "";
    private data: any;

    constructor(private _http: Http, private _Route: Router) {
        this.actionUrl = 'http://localhost:56483/api/Cars';
        this.data = JSON.parse(localStorage.getItem('AdminUser'));
        this.token = this.data.token;
        this.username = this.data.username
    }

    public AddCar(carmodel: CarModel) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Token', `${this.token}`);
        let options = new RequestOptions({ headers: headers });
        return this._http.post('http://localhost:56483/api/Cars', carmodel, options)
            .map((res: Response) => res.json())
            .catch(response =>
            {
                if (response.status === 401) {
                    this._Route.navigate(['Login']);
                }
                return response;
            });
    }

    public validateModelName(Model_Name: string) {
        let UsernameModel = { "Model_Name": Model_Name };
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Token', `${this.token}`);
        let options = new RequestOptions({ headers: headers });
        return this._http.post('http://localhost:56483/api/ValidateModelName', UsernameModel, options)
            .map((res: Response) => res.json())
            .catch(response =>
            {
                if (response.status === 401) {
                    this._Route.navigate(['Login']);
                }
                return response;
            });
    }

    public GetAllCarsDetails = (): Observable<any> =>
    {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Token', `${this.token}`);
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

    public EditCar(CarID: string)
    {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Token', `${this.token}`);
        let options = new RequestOptions({ headers: headers });

        this.actionGetUrl = "http://localhost:56483/api/Cars/" + CarID;
        return this._http.get(this.actionGetUrl, options)
            .map((response: Response) => <any>response.json())
            .catch(response =>
            {
                if (response.status === 401)
                {
                    this._Route.navigate(['Login']);
                }
                return response;
            });
    }

    public UpdateCar(carmodel: CarModel)
    {

        this.actionPutUrl = "http://localhost:56483/api/Cars/" + carmodel.C_Id;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Token', `${this.token}`);
        let options = new RequestOptions({ headers: headers });
        return this._http.put(this.actionGetUrl, carmodel, options).map((res: Response) => res.json())
            .catch(response => {
                if (response.status === 401) {
                    this._Route.navigate(['Login']);
                }
                return response;
            });
    }

}