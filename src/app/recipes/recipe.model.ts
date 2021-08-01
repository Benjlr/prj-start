import { Ingredient } from "../Shared/Ingredient.model";

export class Recipe{
  public Name: string;
  public Description: string;
  public ImagePath: string;
  public Ingredients: Ingredient[];

  constructor(Name:string, desc:string, imagePath:string, ingredients:Ingredient[]){
  this.Name = Name;
  this.Description = desc;
  this.ImagePath = imagePath;
  this.Ingredients = ingredients;
  }
}
