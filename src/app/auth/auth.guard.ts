import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { promise } from "protractor";
import { Observable } from "rxjs";
import { map, take, tap } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
    return this.authService.user.pipe(
      take(1),
      map((user) => {
        const isAuth = !!user;
        if (isAuth) {
          return true;
        }
        return this.router.createUrlTree(["/auth"]);
      })
    );
    // tap(isAuth => {
    //   if(!isAuth){
    //     this.router.navigate(['/auth']);
    //   }
    // }));
  }

  constructor(private authService: AuthService, private router: Router) {}
}
