import { Component } from '@angular/core';
import { NgProgressService } from "ng2-progressbar";
import { Router } from '@angular/router'

@Component({
    templateUrl: 'app/UserDashboard/UserDashboard.html',
    styleUrls: ['../../css/Dashboard.css']
})
export class UserDashboardComponent {
    private data: any;
    constructor() {

    }
}