import { Component, OnInit } from '@angular/core';
import { TripsService } from './../services/trips.service';
import { Trip } from './trip';
import * as _ from 'lodash';


@Component({
  selector: 'app-vacations',
  templateUrl: './vacations.component.html',
  styleUrls: ['./vacations.component.css'],
  providers: [TripsService]
})
export class VacationsComponent implements OnInit {

  destinations: Array<Trip> = [];

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
