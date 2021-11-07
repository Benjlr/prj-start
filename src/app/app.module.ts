import { HeaderComponent } from "./header/header.component";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";

import { ShoppingListModule } from "./shopping-list/shopping-list.module";
import { SharedModule } from "./Shared/shared.module";
import { CoreModule } from "./core.module";
import { AuthModule } from "./auth/auth.module";
import { StoreModule } from "@ngrx/store";
import { shoppingListReducer } from "./shopping-list/store/shopping-list.reducer";

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({shoppingList: shoppingListReducer}),

    ShoppingListModule,
    SharedModule,
    CoreModule,
    AuthModule,
  ],
//  providers:[LoggingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
