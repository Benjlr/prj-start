import { Ingredient } from "./../Shared/Ingredient.model";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ShoppingListService } from "./shopping-list.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  private igChangeSub: Subscription;

  constructor(private shoppingService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredients();
    this.igChangeSub = this.shoppingService.ingredientAdded.subscribe(
      (newINgredients: Ingredient[]) => {
        this.ingredients = newINgredients;
      }
    );
  }
  ngOnDestroy() {
    this.igChangeSub.unsubscribe();
  }
  onEdit(index: number) {
    this.shoppingService.startedEditing.next(index);
  }
}
