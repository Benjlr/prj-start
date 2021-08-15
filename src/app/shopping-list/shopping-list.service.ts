import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../Shared/Ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientAdded = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients:Ingredient[] =[]
  //   new Ingredient("apples",25),
  //   new Ingredient("tomatoes",15)
  // ];


  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientAdded.next(this.ingredients.slice());
  }

  addIngredients(ingredi: Ingredient[]){
    this.ingredients.push(...ingredi)
    this.ingredientAdded.next(this.ingredients.slice());
  }

  getIngredient(index: number){
    return this.ingredients[index];
  }

  getIngredients(){
    return this.ingredients.slice();
  }
  updateIngredient(index: number, newIngre:Ingredient){
    this.ingredients[index] = newIngre;
    this.ingredientAdded.next(this.ingredients.slice());
  }

  deleteIngredient(index:number){
    this.ingredients.splice(index,1);
    this.ingredientAdded.next(this.ingredients.slice());

  }

  constructor() { }
}
