import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { LoggingService } from "../logging.service";
import { SharedModule } from "../Shared/shared.module";
import { ShoppingListEditComponent } from "./shopping-list-edit/shopping-list-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";

@NgModule({
  declarations: [ShoppingListComponent, ShoppingListEditComponent],
  imports: [
    RouterModule.forChild([
      { path: '', component: ShoppingListComponent },
    ]),
    SharedModule,
    FormsModule
  ],
  
})
export class ShoppingListModule {}
