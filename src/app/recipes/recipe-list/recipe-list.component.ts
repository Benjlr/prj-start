import { Recipe } from './../recipe.model';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected= new EventEmitter<Recipe>();

  recipes : Recipe[]=[
    new Recipe("donuts", "How to make Donuts!", "https://static01.nyt.com/images/2014/12/14/magazine/14eat1/14mag-14eat.t_CA0-articleLarge.jpg"),
    new Recipe("Roast Beef", "How to make Roast Beef!", "https://grumpyshoneybunch.com/wp-content/uploads/2020/01/Air-Fryer-Roast-Beef3.jpg.webp")
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(recipe: Recipe){
this.recipeWasSelected.emit(recipe);
  }
}
