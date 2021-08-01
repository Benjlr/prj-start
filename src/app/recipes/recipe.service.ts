import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../Shared/Ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable(

 //{ providedIn: RecipesComponent}
 )
export class RecipeService {

  private recipes : Recipe[]=[
    new Recipe("Donuts", "How to make Donuts!", "https://static01.nyt.com/images/2014/12/14/magazine/14eat1/14mag-14eat.t_CA0-articleLarge.jpg",
      [new Ingredient("donut dust",5), new Ingredient("vegetable oil",1),new Ingredient("cinnamon",6),new Ingredient("happiness",1)]),
    new Recipe("Roast Beef", "How to make Roast Beef!", "https://grumpyshoneybunch.com/wp-content/uploads/2020/01/Air-Fryer-Roast-Beef3.jpg.webp",
      [new Ingredient("Beef shoulder",1 ) , new Ingredient("gravy",3 ), new Ingredient("potates",5)])
  ];

  recipeSelected = new EventEmitter<Recipe>();

  getRecipes(){
    return this.recipes.slice();

  }

  addIngredientsToShoppongList(ingredite:Ingredient[]){
    this.shoppingList.addIngredients(ingredite);
  }

  constructor(private shoppingList: ShoppingListService) { }



}
