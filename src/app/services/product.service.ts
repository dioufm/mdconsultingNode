import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../shared/user';
import { AuthenticationService } from './authentication.service';
import { FileUploader } from 'ng2-file-upload';



@Injectable({ providedIn: 'root' })
export class ProductService {



    currentUser: User;

    endpoint: string = 'api';
    headers = new HttpHeaders().set('Content-Type', 'application/json');



    constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }


    removeProduct(productId: any) {
        const token = this.currentUser.accessToken;
        return this.http.delete<any>(`${environment.apiUrl}/product/delete`, { headers: { 'x-access-token': token, _id: productId } })
            .pipe(map(products => {
                return products;
            }));
    }


    getCountry() {
        let regionId = localStorage.getItem('defaultCountryCode');
        return this.http.get<any>(`${environment.apiUrl}/product/country`, { headers: { _region: regionId } })
            .pipe(map(region => {
                return region;
            }));
    }

    getMarques() {
        return this.http.get<any>(`${environment.apiUrl}/product/marques`)
            .pipe(map(marques => {
                return marques;
            }));
    }



    addPicture(productId) {
        const URL = `${environment.apiUrl}/upload`;
        return new FileUploader({ url: URL, itemAlias: 'file', headers: [{ name: 'productId', value: productId }] });
    }


    createProduct(product, userId) {
        return this.http.post<any>(`${environment.apiUrl}/product/create`, { product, userId })
            .pipe(map(message => {
                return message;
            }));
    }

    updateProduct(product, userId) {
        return this.http.post<any>(`${environment.apiUrl}/product/update`, { product, userId })
            .pipe(map(message => {
                return message;
            }));
    }

    getProducts() {
        return this.http.get<any>(`${environment.apiUrl}/products`)
            .pipe(map(products => {
                return products;
            }));
    }

    getProductById(productId) {
        return this.http.get<any>(`${environment.apiUrl}/products/details/`, { headers: { productId: productId } })
            .pipe(map(products => {
                return products;
            }));
    }

    getProductsByUserId(userId: string) {
        return this.http.get<any>(`${environment.apiUrl}/products/user/`, { headers: { userid: userId } })
            .pipe(map(products => {
                return products;
            }));

    }


    getProductsByCriteria(searchProductCriteriaProduct) {

        /*
        let headers = new HttpHeaders();
        if (searchProductCriteriaProduct.categorieProduct != null) {
            headers = headers.append('categorieProduct', searchProductCriteriaProduct.categorieProduct);
        }
        if (searchProductCriteriaProduct.productName != null) {
            headers = headers.append('productName', searchProductCriteriaProduct.productName);
        }
        return this.http.get<any>(`${environment.apiUrl}/products/search/`, { headers: headers })
            .pipe(map(products => {
                return products;
            }));
            */

        return this.http.post<any>(`${environment.apiUrl}/products/search`, { searchProductCriteriaProduct })
            .pipe(map(products => {
                return products;
            }));
    }


}