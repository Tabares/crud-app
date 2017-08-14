import { Component, OnInit, OnDestroy } from '@angular/core';
import { TripsService } from './../services/trips.service';
import { Trip } from './trip';
import { BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject} from 'rxjs/Subject';
import { Observer } from 'rxjs/Observer';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';


import * as _ from 'lodash';


@Component({
  selector: 'app-vacations',
  templateUrl: './vacations.component.html',
  styleUrls: ['./vacations.component.css'],
  providers: [TripsService]
})

export class VacationsComponent implements OnInit, OnDestroy {

  destinations: Array<Trip> = [];
  private usersObserver$: BehaviorSubject<any> = new BehaviorSubject(null);
  private currentGetTripObserver$: BehaviorSubject<any> = new BehaviorSubject(null);

  private logUpdates$: ReplaySubject<any> = new ReplaySubject(null);
  private y$: ReplaySubject<any> = new ReplaySubject(null);
  private filter$: BehaviorSubject<any> = new BehaviorSubject(null);

  public lastkey: string;

  public doctors$: ReplaySubject<any> = new ReplaySubject(null);
  public doc = new Array<string>();

  public user: Observable<any> = this.usersObserver$.asObservable();

  public currentUser: string;
  result: any;

  constructor(private tripsService: TripsService) {

    this.tripsService.latestError.subscribe(
    err => {
      console.log('result = ' + err);
      this.result = err;
    },
    err => {
      console.log('err');
    },
    () => {
      console.log('complete');
    });
  }

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
        //const userInfo = this.usersObserver$.getValue()[0];
        const userInfo =  data[0];
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

  updateData(country: string, price: string) {
    const data = {
      'country': country,
      'price': price
    };

    this.tripsService.updateTripService(this.lastkey, data)
      .subscribe((val) => {
        this.currentGetTripObserver$.next(val);
        setTimeout(
          () => {
             this.logUpdates$.next(val);
          }, 7000
        );

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

  getFilter() {
    this.tripsService
      .getTripsServiceFilter()
      .filter((person) => person.id > 5)
      .map((person) => 'Dr. ' + person.name)
      .subscribe((val) => {
        this.doc.push(val);
      });
  }

  onSubmit() {
    this.tripsService.error();
  }

  ngOnDestroy() {
    this.tripsService.packageData.unsubscribe();
  }

}
