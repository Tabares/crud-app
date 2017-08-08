import {Http, Headers, BaseRequestOptions, } from '@angular/http';
import 'rxjs/add/operator/map';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import { Injectable } from '@angular/core';


@Injectable()
export class TripsService {
  packageData: Subject<any> = new BehaviorSubject<any>([]);
  constructor(private http: Http) { }
  loadAllPackages () {
  this.http
  .get('https://api.myjson.com/bins/1g87r')
  .map((res: any) => {
    return res.json();
  })
  .subscribe (
    (data: any) => {
      this.packageData.next(data);
    },
    (err: any) => console.error('loadAllPackages: ERROR'),
    () => console.log('loadAllTrips: always')
  );
  }

}
