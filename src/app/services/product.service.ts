import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../shared/user';
import { AuthenticationService } from './authentication.service';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload';



@Injectable({ providedIn: 'root' })
export class ProductService {

    currentUser: User;

    endpoint: string = 'api';
    headers = new HttpHeaders().set('Content-Type', 'application/json');



    constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    getAllCategories() {
        return this.http.get<any>(`${environment.apiUrl}/product/categories`)
            .pipe(map(categories => {
                return categories;
            }));
    }

    remove(userId: any) {
        const token = this.currentUser.accessToken;
        return this.http.delete<any>(`${environment.apiUrl}/admin/deleteUser`, { headers: { 'x-access-token': token, _id: userId } })
            .pipe(map(users => {
                return users;
            }));
    }


    getCountry() {
        let regionId = localStorage.getItem('defaultCountryCode');
        return this.http.get<any>(`${environment.apiUrl}/product/country`, { headers: { _region: regionId } })
            .pipe(map(region => {
                return region;
            }));
    }

    addPicture() {
        const URL = `${environment.apiUrl}/upload`;

        return new FileUploader({ url: URL, itemAlias: 'image' });
    }


}