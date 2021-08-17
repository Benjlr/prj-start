import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AlertComponent } from "../Shared/Alert/alert.component";
import { DomPlaceHolder } from "../Shared/DomPlaceHolder/domplaceholder.directive";
import { AuthService,AuthResponseData } from "./auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
})
export class AuthComponent implements OnInit, OnDestroy {
  isLogInMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(DomPlaceHolder, {static:  false}) alertHost: DomPlaceHolder;
  private closeSub: Subscription;

  constructor(private cfr: ComponentFactoryResolver, private auth: AuthService, private router: Router) {}

  onSwitchMode() {
    this.isLogInMode = !this.isLogInMode;
  }

  ngOnInit() {}
  ngOnDestroy(){
    if(this.closeSub){
      this.closeSub.unsubscribe();
    }
  }


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
        this.showErrorAlert(err);
        this.isLoading = false;
      }
    );

    console.log(form.value);
    form.reset();
  }

  onHandleError(){
    this.error = null;
  }

  private showErrorAlert(message: string){
    const alertCompFact = this.cfr.resolveComponentFactory(AlertComponent);
    const hostViewRef = this.alertHost.viewcontainerRef;
    hostViewRef.clear();
    const componentRef = hostViewRef.createComponent(alertCompFact);
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewRef.clear();
    });
  }
}
