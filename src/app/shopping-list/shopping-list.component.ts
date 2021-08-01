import { Ingredient } from './../Shared/Ingredient.model';
import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
ingredients:Ingredient[] = []

  constructor(private shoppingService:ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredients();
    this.shoppingService.ingredientAdded.subscribe((newINgredients:Ingredient[])=>{
      this.ingredients = newINgredients;
    })
  }


}
