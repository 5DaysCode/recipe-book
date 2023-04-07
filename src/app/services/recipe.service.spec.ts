import { TestBed } from '@angular/core/testing';
import { RecipeService } from './recipe.service';
import { Recipe } from '../interfaces/recipe.interface';
import * as mockRecipes from '../../data/mock-recipes.json';

describe('RecipeService', () => {
  let service: RecipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all recipes', (done) => {
    service.getRecipes().subscribe((recipes) => {
      expect(recipes).toEqual(mockRecipes);
      done();
    });
  });

  it('should fetch recipe by id', () => {
    const recipeId = 1;
    const recipe = service.getRecipeById(recipeId);
    expect(recipe).toEqual(mockRecipes.find((r) => r.id === recipeId));
  });

  it('should delete a recipe by id', () => {
    const recipeIdToDelete = 1;
    service.deleteRecipe(recipeIdToDelete);
    const deletedRecipe = service.getRecipeById(recipeIdToDelete);
    expect(deletedRecipe).toBeUndefined();
  });

  // Add more tests for other service methods
});
