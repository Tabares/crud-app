import { Component, OnInit } from '@angular/core';


import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subject} from 'rxjs/Subject';
import { BehaviorSubject} from 'rxjs/BehaviorSubject';
import { ReplaySubject} from 'rxjs/ReplaySubject';
import { AsyncSubject} from 'rxjs/AsyncSubject';


@Component({
  selector: 'app-observables',
  templateUrl: './observables.component.html',
  styleUrls: ['./observables.component.css']
})
export class ObservablesComponent implements OnInit {
  behaviorSubject$ = new BehaviorSubject<any>(null);
  replaySubject$ = new ReplaySubject<any>(3);
  subject$ = new Subject();
  observable$ = new Observable<any>();

  observer$ = new BehaviorSubject<any>(null);
  observerString: any;

  constructor() { }

  ngOnInit() {
   const observable$ = new Observable();



  }


  funObservable() {
    console.log('/************* Observable *************************/');
    /*
    Observables are lazy Push collections of multiple values.
    Observables are like functions with zero arguments, but generalize those to allow multiple values.
    Subscribing to an Observable is analogous to calling a Function.
    Observables are able to deliver values either synchronously or asynchronously.
    Rx.Observable.create is an alias for the Observable constructor, and it takes one argument: the subscribe function.
    Subscribing to an Observable is like calling a function, providing callbacks where the data will be delivered to.
    There are three types of values an Observable Execution can deliver:
      "Next" notification: sends a value such as a Number, a String, an Object, etc.
      "Error" notification: sends a JavaScript Error or exception.
      "Complete" notification: does not send a value.
    When you subscribe, you get back a Subscription,
    which represents the ongoing execution. Just call unsubscribe() to cancel the execution.
    An Observer is a consumer of values delivered by an Observable. Observers are simply a set of callbacks,
    one for each type of notification delivered by the Observable: next, error, and complete.
    Observers are just objects with three callbacks, one for each type of notification that an Observable may deliver.
    A Subscription is an object that represents a disposable resource, usually the execution of an Observable.
    A Subscription has one important method, unsubscribe, that takes no argument and just disposes the resource held by the subscription.



    */
    const observable = new Observable( (observer) => {
      observer.next(1);
      observer.next(2);
      observer.next(3);
      setTimeout(() => {
        observer.next(4);
      }, 1000);
      setTimeout(() => {
        observer.complete();
      }, 5000);
      setInterval(() => {
        observer.next(Math.floor(Math.random() * (10 - 1) + 1));
      }, 1000);
    });

    console.log('just before subscribe');
    observable.subscribe({
      next: (x) => console.log(),
      error: err => console.error('something wrong occurred: ' + err),
      complete: () => console.log('done'),
    });


    observable.subscribe(
     (x) => {
       console.log('Print value on the markup: ' + x);
       this.observer$.next(x);
       this.observerString = x;
     });
     console.log('just after subscribe');
  }


  funSubject() {
    console.log('/************* Subject *************************/');
    /*
    A Subject is like an Observable, but can multicast to many Observers.
    Subjects are like EventEmitters: they maintain a registry of many listeners.
    */
     const newObserver = new Observable(
       (Observer) => {
         Observer.next(12);
       }
     );

     newObserver.subscribe(
      (y) => {
        this.print('y ', y);
    });

    this.subject$.next(-1);    // 1
    this.subject$.subscribe(x => this.print('A: Value from Subject$', x));
    this.subject$.subscribe(x => this.print('B: Value from Subject$', x));
    this.subject$.next(1);    // 1
    this.subject$.next(2);    // 2

    const observable = Observable.from([1, 2, 3]);
    //observable.subscribe(this.subject$);

    this.subject$.complete();
    this.subject$.next(3);    // silently ignored
    //subject$.unsubscribe();
    this.subject$.next(4);    // Unhandled ObjectUnsubscribedError
  }

  funBehaviorSubject() {
    console.log('/************* Behaviour Subject *************************/');
    /*
    BehaviorSubjects are useful for representing "values over time".
    For instance, an event stream of birthdays is a Subject, but the stream of a person's age would be a BehaviorSubject.
     */
    this.behaviorSubject$.next(-2);
    this.behaviorSubject$.next(-1);
    this.behaviorSubject$.subscribe((val) => this.print('Value from Behavior Subject', val));
    this.behaviorSubject$.next(1);
    this.behaviorSubject$.next(2);
    this.behaviorSubject$.next(3);
    this.behaviorSubject$.complete();
    this.behaviorSubject$.next(6);
    //this.behaviorSubject$.unsubscribe();
    this.behaviorSubject$.next(9);

  }

  funReplaySubject() {
    console.log('/************* Replay Subject *************************/');
    /*
    A ReplaySubject records multiple values from the Observable execution and replays them to new subscribers.
    */
    this.replaySubject$.next(-4);
    this.replaySubject$.next(-3);
    this.replaySubject$.next(-2);
    this.replaySubject$.next(-1);
    this.replaySubject$.subscribe((val) => this.print('Value from Replay Subject', val));
    this.replaySubject$.next(1);
    this.replaySubject$.next(2);
    this.replaySubject$.next(3);

    this.replaySubject$.subscribe((val) => this.print('________Value from Replay Subject', val));
    this.replaySubject$.next(4);
    this.replaySubject$.complete();
    this.replaySubject$.next(6);
    //this.replaySubject$.unsubscribe();
    this.replaySubject$.next(9);

  }

  funAsyncSubject() {
    console.log('/************* Replay Subject *************************/');
    /*
    The AsyncSubject is a variant where only the last value of the Observable execution is sent to its observers,
    and only when the execution completes.
    */
    const subject = new AsyncSubject();

    subject.subscribe({
      next: (v) => this.print('observerA: ' , v)
    });

    subject.next(1);
    subject.next(2);
    subject.next(3);
    subject.next(4);

    subject.subscribe({
      next: (v) => this.print('observerB: ', v)
    });

    subject.next(5);
    subject.complete();

  }

  print(message, val) {
    console.log(message, val);
  }

}
