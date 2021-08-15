import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, take, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({
  providedIn: "root",
})
export class DataService {
  constructor(
    private myClient: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();

    return this.myClient
      .put(
        "https://recipesapp-1476d-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json",
        recipes
      )
      .subscribe((x) => {
        console.log(x);
      });
  }

  fetchRecipes() {
    return this.myClient.get<Recipe[]>(
          "https://recipesapp-1476d-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json"
        ).pipe(
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            Ingredients: recipe.Ingredients ? recipe.Ingredients : [],
          };
        });
      }),
      tap((recpes) => {
        this.recipeService.setRecipes(recpes);
      })
    );
  }
}
