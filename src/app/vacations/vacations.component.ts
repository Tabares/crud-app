import { Component, OnInit } from '@angular/core';
import { TripsService } from './../services/trips.service';
import { Trip } from './trip';
import { BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import * as _ from 'lodash';


@Component({
  selector: 'app-vacations',
  templateUrl: './vacations.component.html',
  styleUrls: ['./vacations.component.css'],
  providers: [TripsService]
})
export class VacationsComponent implements OnInit {

  destinations: Array<Trip> = [];
  private usersObserver$: BehaviorSubject<any> = new BehaviorSubject(null);
  private currentGetTripObserver$: BehaviorSubject<any> = new BehaviorSubject(null);
  public lastkey: string;

  public user: Observable<any> = this.usersObserver$.asObservable();
  public currentUser: string;
  constructor(private tripsService: TripsService) { }

  ngOnInit() {
    this
    .tripsService
    .packageData
    .subscribe( (trips: any) => {
      setTimeout(() => {
        this.destinations = trips;
        this.sortByPrice();
        }, 1500);
    });

    this.tripsService.loadAllPackages();

    this.tripsService.getUsersService().subscribe(
      (data: any) => {
        console.log(data);
        this.usersObserver$.next(data);
        const userInfo = this.usersObserver$.getValue()[0];
        this.currentUser = userInfo.firstName + ' ' + userInfo.lastName;
      },
      (err: any) => console.error('ERROR')
      );

  }

  postData() {
    this.tripsService.saveTrip()
      .subscribe( (val) => {
        if (val) {
          this.lastkey = val['uri'];
          this.getCurrentTrip( this.lastkey );
        }
      });
  }

  getCurrentTrip(url) {
    this.tripsService.getCurrentTrip(url).subscribe(
      (val: any) => {
        this.currentGetTripObserver$.next(val);
      },
      (err: any) => console.error('ERROR')
    );
  }

  refreshData() {
    this.destinations.length = 0;
    this.tripsService.loadAllPackages();
  }

  sortByPrice () {
    this.destinations = _.sortBy(
      this.destinations, function(d: any) {
        return parseInt(d['price'].replace(',', ''), 10);
      }
    );
  }

}
