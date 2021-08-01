import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { ShoppingListService } from "src/app/shopping-list/shopping-list.service";
import { Recipe } from "../recipe.model";
import { RecipeService } from "../recipe.service";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.css"],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  constructor(
    private recipeList: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.recipe = this.recipeList.getRecipe(this.id);
    });
  }

  onAddRecipeIngredients() {
    this.recipeList.addIngredientsToShoppongList(this.recipe.Ingredients);
  }
  OnEditRecipe() {
    this.router.navigate(["edit"], { relativeTo: this.route });
  }
}
