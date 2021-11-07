import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private route: Router) {}

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDH7wI5Splt9jZgnEOvSl1Tz6fQNlK2jEU",
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + environment.firebaseKey,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  logout() {
    localStorage.clear();
    this.user.next(null);
    this.route.navigate(["/auth"]);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }

    this.tokenExpirationTimer = null;
  }

  autoLogOut(expiration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expiration);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIN: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIN * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogOut(expiresIN * 1000);
    localStorage.setItem("userData", JSON.stringify(user));
  }

  private handleError(errorResp: HttpErrorResponse) {
    let errorMessage = "Unknown error!";
    if (!errorResp.error || !errorResp.error.error) {
      return throwError(errorMessage);
    }

    switch (errorResp.error.error.message) {
      case "EMAIL_EXISTS":
        errorMessage = "Email has already been used";
      case "EMAIL_NOT_FOUND" || "INVALID_PASSWORD":
        errorMessage = "Invalid Credentials!";
    }
    return throwError(errorMessage);
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpire: string;
    } = JSON.parse(localStorage.getItem("userData"));
    if (!userData) return;

    const user = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpire)
    );
    if (user.token) {
      this.user.next(user);
      const expirationDuration =
        new Date(userData._tokenExpire).getTime() - new Date().getTime();
      this.autoLogOut(expirationDuration);
    }
  }
}
