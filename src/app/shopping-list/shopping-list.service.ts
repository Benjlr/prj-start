import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../Shared/Ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private ingredients:Ingredient[] =[
    new Ingredient("apples",25),
    new Ingredient("tomatoes",15)
  ];

  ingredientAdded = new EventEmitter<Ingredient[]>();

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientAdded.emit(this.ingredients.slice());
  }

  addIngredients(ingredi: Ingredient[]){
    this.ingredients.push(...ingredi)
    this.ingredientAdded.emit(this.ingredients.slice());
  }

  getIngredients(){
    return this.ingredients.slice();
  }

  constructor() { }
}
