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

    private loginEventCreatingProduct = new Subject();

    currentCategorie = new Subject();

    currentSubCategorie = new Subject();

    private navigatePageEvent = new Subject();

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

    getLoginEventCreatingProduct(): Observable<any> {
        return this.loginEventCreatingProduct.asObservable();
    }

    setLoginEventCreatingProduct(loginEventCreatingProduct) {
        this.loginEventCreatingProduct.next(loginEventCreatingProduct);
    }

    getCurrentCategorie(): Observable<any> {
        return this.currentCategorie.asObservable();
    }

    setCurrentCategorie(currentCategorie) {
        this.currentCategorie.next(currentCategorie);
    }

    getCurrentSubCategorie(): Observable<any> {
        return this.currentSubCategorie.asObservable();
    }

    setCurrentSubCategorie(subCategorie) {
        this.currentSubCategorie.next(subCategorie);
    }

    getNavigatePageEvent(): Observable<any> {
        return this.navigatePageEvent.asObservable();
    }

    setNavigatePageEvent(navigatePageEvent) {
        this.navigatePageEvent.next(navigatePageEvent);
    }

}