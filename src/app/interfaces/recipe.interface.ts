export interface Recipe {
  id: number;
  title: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string[];
}

export interface Ingredient {
  id: number;
  name: string;
  quantity: string;
}
