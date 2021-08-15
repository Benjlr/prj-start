import {
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, take } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((u) => {
        if(!u){
          return next.handle(req);
        }
          const modified = req.clone({params: new HttpParams().set('auth',u.token)})
          return next.handle(modified);
      })
    );
  }

  constructor(private authService: AuthService) {}
}
