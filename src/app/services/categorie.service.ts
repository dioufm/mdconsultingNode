import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../shared/user';
import { AuthenticationService } from './authentication.service';



@Injectable({ providedIn: 'root' })
export class CategorieService {



    currentUser: User;

    endpoint: string = 'api';
    headers = new HttpHeaders().set('Content-Type', 'application/json');



    constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    getAllCategories() {
        return this.http.get<any>(`${environment.apiUrl}/categorie/categories`)
            .pipe(map(categories => {
                return categories;
            }));
    }


    getCategorieById(categorieId) {
        const token = this.currentUser.accessToken;
        return this.http.get<any>(`${environment.apiUrl}/categorie/details/`, { headers: { 'x-access-token': token, categorieId: categorieId } })
            .pipe(map(products => {
                return products;
            }));
    }

    updateCategorie(categorie) {
        const token = this.currentUser.accessToken;
        return this.http.post<any>(`${environment.apiUrl}/categorie/update`, { categorie: categorie })
            .pipe(map(message => {
                return message;
            }));
    }

    addNewCategorie(categorie) {
        const token = this.currentUser.accessToken;
        return this.http.post<any>(`${environment.apiUrl}/categorie/add`, { categorie: categorie })
            .pipe(map(message => {
                return message;
            }));
    }



    remove(categorieId: any) {
        const token = this.currentUser.accessToken;
        return this.http.delete<any>(`${environment.apiUrl}/categorie/delete`, { headers: { 'x-access-token': token, _id: categorieId } })
            .pipe(map(users => {
                return users;
            }));
    }

    getCategorieByCode(categoriecode) {
        const token = this.currentUser.accessToken;
        return this.http.get<any>(`${environment.apiUrl}/categorie/detailsbycode/`, { headers: { categoriecode: categoriecode } })
            .pipe(map(products => {
                return products;
            }));
    }


}