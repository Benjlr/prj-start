import { Recipe } from './../recipe.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes : Recipe[]=[
    new Recipe("donuts", "How to make Donuts!", "https://www.littlenation.com.au/wp-content/uploads/2020/07/FVW2awFQ.jpeg"),
    new Recipe("Roast Beef", "How to make Roast Beef!", "https://grumpyshoneybunch.com/wp-content/uploads/2020/01/Air-Fryer-Roast-Beef3.jpg.webp")
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
