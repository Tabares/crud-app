import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-spotify',
  templateUrl: './spotify.component.html',
  styleUrls: ['./spotify.component.css']
})
export class SpotifyComponent implements OnInit {

  @Input() results: Observable<any>;
  @Output() searchEvent: EventEmitter<any> = new EventEmitter();

  private customerForm: FormGroup;

  constructor(private fb: FormBuilder ) {

  }

  ngOnInit() {
    this.customerForm = this.fb.group({
      searchBox: ['', []],
    });

    const emailControl = this.customerForm.get('emailGroup.email');
    //emailControl.valueChanges.subscribe( (value) => value);
  }

}
