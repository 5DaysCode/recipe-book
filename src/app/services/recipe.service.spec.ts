import { TestBed } from '@angular/core/testing';
import { RecipeService } from './recipe.service';
import { Recipe } from '../interfaces/recipe.interface';
import mockRecipesData from '../../data/mock-recipes.json';

describe('RecipeService', () => {
  let service: RecipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecipeService],
    });
    service = TestBed.inject(RecipeService);
    // Set the mock recipes in the service
    service.setRecipes(mockRecipesData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all recipes', (done) => {
    service.getRecipes().subscribe((recipes) => {
      expect(recipes).toEqual(mockRecipesData);
      done();
    });
  });

  it('should fetch recipe by id', () => {
    const recipeId = 1;
    const recipe = service.getRecipeById(recipeId);
    expect(recipe).toEqual(mockRecipesData.find((r) => r.id === recipeId));
  });

  it('should delete a recipe by id', (done) => {
    const recipeIdToDelete = 1;

    service.deleteRecipe(recipeIdToDelete);
    service.getRecipes().subscribe((recipes) => {
      const deletedRecipe = recipes.find((r) => r.id === recipeIdToDelete);
      expect(deletedRecipe).toBeUndefined();
      done();
    });
  });

  it('should update a recipe by id', (done) => {
    const recipeIdToUpdate = 1;

    const updatedRecipe: Recipe = {
      id: recipeIdToUpdate,
      title: 'Updated Recipe Title',
      description: 'Updated Recipe Description',
      ingredients: [
        {
          id: 1,
          name: 'Updated Ingredient',
          quantity: '100g',
        },
      ],
      instructions: ['Updated Instruction'],
    };

    service.updateRecipe(recipeIdToUpdate, updatedRecipe);

    service.getRecipes().subscribe((recipes) => {
      const recipe = recipes.find((r) => r.id === recipeIdToUpdate);
      expect(recipe).toEqual(updatedRecipe);
      done();
    });
  });
});
