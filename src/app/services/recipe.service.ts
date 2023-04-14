import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Recipe, Ingredient } from '../interfaces/recipe.interface';
import * as mockRecipes from '../../data/mock-recipes.json';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private _recipes: BehaviorSubject<Recipe[]> = new BehaviorSubject<Recipe[]>(
    (mockRecipes as any).default
  );

  constructor() {}

  getRecipes(): Observable<Recipe[]> {
    console.log('Getting Recipes');
    return this._recipes.asObservable().pipe(map((recipes) => recipes));
  }

  setRecipes(recipes: Recipe[]): void {
    this._recipes.next(recipes);
  }

  loadRecipesFromJson(recipesJson: Recipe[]): void {
    this._recipes.next(recipesJson);
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
    const index = this._recipes.value.findIndex((recipe) => recipe.id === id);
    if (index >= 0) {
      this._recipes.value[index] = updatedRecipe;
      this._recipes.next(this._recipes.value);
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
