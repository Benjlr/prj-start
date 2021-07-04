import { Ingredient } from './../Shared/Ingredient.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients:Ingredient[] =[
    new Ingredient("apples",25),
    new Ingredient("tomatoes",15)
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
