import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { Ingredient } from "../Shared/Ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";
import * as shoppingListActions from "../shopping-list/store/shopping-list.actions"

@Injectable()

//{ providedIn: RecipesComponent}
export class RecipeService {
recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = []
  //   new Recipe(
  //     "Donuts",
  //     "How to make Donuts!",
  //     "https://static01.nyt.com/images/2014/12/14/magazine/14eat1/14mag-14eat.t_CA0-articleLarge.jpg",
  //     [
  //       new Ingredient("donut dust", 5),
  //       new Ingredient("vegetable oil", 1),
  //       new Ingredient("cinnamon", 6),
  //       new Ingredient("happiness", 1),
  //     ]
  //   ),
  //   new Recipe(
  //     "Roast Beef",
  //     "How to make Roast Beef!",
  //     "https://grumpyshoneybunch.com/wp-content/uploads/2020/01/Air-Fryer-Roast-Beef3.jpg.webp",
  //     [
  //       new Ingredient("Beef shoulder", 1),
  //       new Ingredient("gravy", 3),
  //       new Ingredient("potates", 5),
  //     ]
  //   ),
  // ];

  recipeSelected = new Subject<Recipe>();

  getRecipes() {
    return this.recipes.slice();
  }
  getRecipe(id: number) {
    return this.recipes[id];
  }

  addIngredientsToShoppongList(ingredite: Ingredient[]) {
    //this.shoppingList.addIngredients(ingredite);
    this.store.dispatch(new shoppingListActions.AddIngredients(ingredite))
  }

  constructor(private shoppingList: ShoppingListService,
    private store : Store<{ shoppingList: { ingredients: Ingredient[] }}>) {}

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
    console.log(this.recipes);
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index,1);
    this.recipesChanged.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice())
  }

}
