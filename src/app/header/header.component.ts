import{ Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataService } from '../Shared/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit, OnDestroy{
private authSub : Subscription;
isAuthenticated = false;

constructor(
  private data: DataService,
  private authService: AuthService){}

ngOnInit(){
this.authSub = this.authService.user.subscribe(user=>{
  this.isAuthenticated = !!user;
});

}

ngOnDestroy(){
  this.authSub.unsubscribe();
}

  onSaveData(){
    this.data.storeRecipes();
  }

  onFetchData(){
    this.data.fetchRecipes().subscribe();
  }

  logout(){
    this.authService.logout();
  }
}
