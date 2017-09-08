import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Http, Headers, BaseRequestOptions, RequestOptions } from '@angular/http';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  private data: Observable<any>;
  private dataObserver: Observer<any>;

  constructor(private http: Http) {
    this.data = new Observable(observer => this.dataObserver = observer);
  }

  onSearch(event) {
    this.http.get(
      'https://api.myjson.com/bins/15pf4l'
      ).map((response) => {
        const user = response.json();

    }).subscribe(result => {
      this.dataObserver.next(result);
    }, error => console.log('Could not load artists'));
  }

}
