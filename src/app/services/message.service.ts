import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { User } from "../shared/user";
import { AuthenticationService } from "./authentication.service";
import { FileUploader } from "ng2-file-upload";

@Injectable({ providedIn: "root" })
export class MessageService {
  currentUser: User;

  endpoint: string = "api";
  headers = new HttpHeaders().set("Content-Type", "application/json");

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
  }

  createMessage(message, userId, productId) {
    return this.http
      .post<any>(`${environment.apiUrl}/message/create`, {
        message,
        userId,
        productId,
      })
      .pipe(
        map((message) => {
          return message;
        })
      );
  }

  createAnswerMessage(message, userId, currentMessageId) {
    return this.http
      .post<any>(`${environment.apiUrl}/message/answer`, {
        message,
        userId,
        currentMessageId,
      })
      .pipe(
        map((message) => {
          return message;
        })
      );
  }

  getMessagesByUserId(userId: string) {
    return this.http
      .get<any>(`${environment.apiUrl}/messages/user/`, {
        headers: { userid: userId },
      })
      .pipe(
        map((products) => {
          return products;
        })
      );
  }
}
