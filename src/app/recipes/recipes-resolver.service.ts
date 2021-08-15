import { Injectable } from "@angular/core";
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { DataService } from "../Shared/data.service";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";

@Injectable({
  providedIn: "root",
})
export class RecipeResolverService implements Resolve<Recipe[]> {
  constructor(private data: DataService, private recipeServ: RecipeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipeServ.getRecipes();

    if (recipes.length === 0) {
      return this.data.fetchRecipes();
    } else {
      return recipes;
    }
  }
}
