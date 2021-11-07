import { Ingredient } from "../../Shared/Ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";

const initialState = {
  ingredients: [new Ingredient("apples", 25), new Ingredient("tomatoes", 15)],
};

export function shoppingListReducer(
  state = initialState,
  action: ShoppingListActions.AddIngredient
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        Ingredients: [...state.ingredients, action.payload],
      };
    default:
      return state;
  }
}
