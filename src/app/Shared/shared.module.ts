import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertComponent } from "./Alert/alert.component";
import { DomPlaceHolder } from "./DomPlaceHolder/domplaceholder.directive";
import { DropdownDirective } from "./dropdown.directive";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";

@NgModule({
  declarations:[
    AlertComponent,
    DomPlaceHolder,
    DropdownDirective,
    LoadingSpinnerComponent
  ],
  imports:[
    CommonModule
  ],
  exports:[
    AlertComponent,
    LoadingSpinnerComponent,
    DropdownDirective,
    DomPlaceHolder,
    CommonModule
  ]
})
export class SharedModule{

}
