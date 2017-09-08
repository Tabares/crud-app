import { Component, OnInit,  OnDestroy  } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnDestroy, OnInit {
  message: any;
  subscription: Subscription;

  constructor(private messageService: MessageService) {
    this.subscription = this.messageService
      .getMessage()
      .subscribe(
        (message) => {
          this.message = message;
        });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();

  }

}
