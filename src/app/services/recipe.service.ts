import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Recipe, Ingredient } from '../interfaces/recipe.interface';
import * as mockRecipes from '../../data/mock-recipes.json';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private _recipes: BehaviorSubject<Recipe[]> = new BehaviorSubject<Recipe[]>(
    mockRecipes
  );

  constructor() {}

  getRecipes(): Observable<Recipe[]> {
    return this._recipes.asObservable();
  }

  getRecipeById(id: number): Recipe | undefined {
    return this._recipes.value.find((recipe) => recipe.id === id);
  }
  // Add a new recipe
  addRecipe(recipe: Recipe): void {
    const newId = Math.max(...this._recipes.value.map((r) => r.id)) + 1;
    const newRecipe: Recipe = { ...recipe, id: newId };
    const updatedRecipes = [...this._recipes.value, newRecipe];
    this._recipes.next(updatedRecipes);
  }

  // Update an existing recipe
  updateRecipe(id: number, updatedRecipe: Recipe): void {
    const recipeIndex = this._recipes.value.findIndex(
      (recipe) => recipe.id === id
    );
    if (recipeIndex !== -1) {
      const updatedRecipes = [...this._recipes.value];
      updatedRecipes[recipeIndex] = { ...updatedRecipe, id };
      this._recipes.next(updatedRecipes);
    }
  }

  // Delete a recipe
  deleteRecipe(id: number): void {
    const updatedRecipes = this._recipes.value.filter(
      (recipe) => recipe.id !== id
    );
    this._recipes.next(updatedRecipes);
  }
}
