import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  hoverSection: HTMLElement;

  constructor() { }

  ngOnInit() {
    this.hoverSection = document.getElementById('hover');
    this.hoverSection.addEventListener('mousemove', OnMouseMove);
    this.hoverSection.addEventListener('click', onClick);

  }

  unsubscribe() {
    console.log('Called unsubscribe');
    this.hoverSection.removeEventListener('mousemove', OnMouseMove);
  }


}

function OnMouseMove(ev: MouseEvent) {
  console.log(ev);
}

function onClick(ev: MouseEvent) {
  console.log(ev);
}
