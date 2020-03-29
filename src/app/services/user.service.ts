import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../shared/user';
import { AuthenticationService } from './authentication.service';



@Injectable({ providedIn: 'root' })
export class UserService {

    currentUser: User;

    endpoint: string = 'api';
    headers = new HttpHeaders().set('Content-Type', 'application/json');



    constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
        this.headers.set('Access-Control-Allow-Headers', 'x-access-token');
        this.headers.set('x-access-token', this.currentUser.accessToken);
    }

    getAllUsers() {
        const token = this.currentUser.accessToken;
        return this.http.get<any>(`${environment.apiUrl}/admin/users`, { headers: { 'x-access-token': token } })
            .pipe(map(users => {
                return users;
            }));
    }

    remove(userId: any) {
        const token = this.currentUser.accessToken;
        return this.http.delete<any>(`${environment.apiUrl}/admin/deleteUser`, { headers: { 'x-access-token': token, _id: userId } })
            .pipe(map(users => {
                return users;
            }));
    }



}