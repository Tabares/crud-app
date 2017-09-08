import { Component, OnInit } from '@angular/core';
import { MessageComponent } from '../message/message.component';
import { MessageService } from '../services/message.service';


@Component({
  selector: 'app-sender',
  templateUrl: './sender.component.html',
  styleUrls: ['./sender.component.css']
})
export class SenderComponent implements OnInit {

  constructor(private messageService: MessageService) { }

  ngOnInit() {
  }

  sendMessage(): void {
    this.messageService.sendMessage('Message from sender component');
  }

  clearMessage(): void {
    this.messageService.clearMessage();
  }

}
