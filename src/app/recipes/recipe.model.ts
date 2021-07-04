export class Recipe{
  public Name: string;
  public Description: string;
  public ImagePath: string;

  constructor(Name:string, desc:string, imagePath:string){
this.Name = Name;
this.Description = desc;
this.ImagePath = imagePath;
  }
}
