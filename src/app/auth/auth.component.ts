import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService,AuthResponseData } from "./auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
})
export class AuthComponent implements OnInit {
  isLogInMode = true;
  isLoading = false;
  error: string = null;

  constructor(private auth: AuthService, private router: Router) {}

  onSwitchMode() {
    this.isLogInMode = !this.isLogInMode;
  }

  ngOnInit() {}



  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    this.isLoading = true;


    let authObs : Observable<AuthResponseData>
    if (this.isLogInMode) {
      const email = form.value.email;
      const password = form.value.password;

      this.isLoading = true;
      authObs =  this.auth.login(email, password);
    }
    else{
      const email = form.value.email;
      const password = form.value.password;

      authObs =this.auth.signUp(email, password);
    }

    authObs.subscribe(
      (resdata) => {
        console.log(resdata);
        this.isLoading = false;
        this.router.navigate(['/recipes'])
      },
      (err) => {
        console.log(err);
        this.error = err;
        this.isLoading = false;
      }
    );

    console.log(form.value);
    form.reset();
  }


}
