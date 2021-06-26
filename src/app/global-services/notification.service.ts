import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { Subject, Subscription } from 'rxjs';
import { httpErrorModel, normalErrorModel } from './errorhandler.service'

/*
like OnInit() work with Directives and Components. They do not work with other types, like a service in your case. From docs:

A Component has a lifecycle managed by Angular itself. Angular creates it, renders it, creates and renders its children, checks it when its data-bound properties change and destroy it before removing it from the DOM.

Directive and component instances have a lifecycle as Angular creates, updates, and destroys them.

onInit() => can only user for directive or compnonent
ondestroy() => can use for pipe, service, directive, component
*/

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class NotificationService implements OnDestroy{

  errorNotificationSubject : Subject<any> = new Subject();
  successNotificationSubject : Subject<any> = new Subject();
  warningNotificationSubject : Subject<any> = new Subject();

  private notificationSubjectsSubscription : Subscription [] = [];

  constructor(
    private toastrService : NbToastrService
    ) { 
     this.notificationSubjectsSubscription.push(this.errorNotificationSubject.subscribe(
        (notificaton : (httpErrorModel & normalErrorModel)) => {
          const notificationBody = `${notificaton.errorMessagefromServer} | ${notificaton.errorMessage}`;
          const notificationHeader = `${notificaton.errorStatusText} :: ${notificaton.errorStatusTextfromServer}`
          toastrService.danger(notificationBody, notificationHeader)
        }
      ));

      this.notificationSubjectsSubscription.push(this.successNotificationSubject.subscribe(
        (notification : any) => {
          const username = notification;
          toastrService.success(username, 'Welcome!')
        }
      ));

      this.notificationSubjectsSubscription.push(this.warningNotificationSubject.subscribe(
        (notification : any) => {

        }
      ));
    }
  ngOnDestroy() {
    this.notificationSubjectsSubscription.forEach(sub => sub.unsubscribe)
  }
}
