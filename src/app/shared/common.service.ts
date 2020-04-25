import { Injectable } from '@angular/core';
import { Student } from './student';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { User } from './user';

@Injectable({
    providedIn: 'root'
})

export class CommonService {

    private subscribeEvent = new Subject();

    private loginEvent = new Subject();

    getSubscribeEvent(): Observable<any> {
        return this.subscribeEvent.asObservable();
    }

    setSubscribeEvent(subscribeEvent) {
        this.subscribeEvent.next(subscribeEvent);
    }

    getLoginEvent(): Observable<any> {
        return this.loginEvent.asObservable();
    }

    setLoginEvent(loginEvent) {
        this.loginEvent.next(loginEvent);
    }



}