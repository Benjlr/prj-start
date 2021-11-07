import { Ingredient } from "./../Shared/Ingredient.model";
import { Component, OnInit } from "@angular/core";
import { ShoppingListService } from "./shopping-list.service";
import { Observable, Subscription } from "rxjs";
import { LoggingService } from "../logging.service";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  //private igChangeSub: Subscription;

  constructor(
    private shoppingService: ShoppingListService,
    private log: LoggingService,
    private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>
  ) {}

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.slService.getIngredients();
    // this.subscription = this.slService.ingredientsChanged.subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   }
    // );
    let igloee = this.ingredients.forEach(x=>console.log(x))
    this.log.printLog("HI FROM SHOP");
  }

  onEdit(index: number) {
    this.shoppingService.startedEditing.next(index);
  }
}
