import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { RecipeListComponent } from './recipe-list.component';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../interfaces/recipe.interface';
import { Observable, of, throwError } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

// 1. Create a mock recipe list
const mockRecipes: Recipe[] = [
  {
    id: 1,
    title: 'Test Recipe 1',
    description: 'Test description 1',
    ingredients: [],
    instructions: [],
  },
  {
    id: 2,
    title: 'Test Recipe 2',
    description: 'Test description 2',
    ingredients: [],
    instructions: [],
  },
];

// 2. Create a mock RecipeService
class MockRecipeService {
  getRecipes(): Observable<Recipe[]> {
    return of(mockRecipes);
  }
}

describe('RecipeListComponent', () => {
  let component: RecipeListComponent;
  let fixture: ComponentFixture<RecipeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipeListComponent],
      // 3. Provide the MockRecipeService as a replacement for the actual RecipeService
      providers: [{ provide: RecipeService, useClass: MockRecipeService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeListComponent);
    component = fixture.componentInstance;
    component.recipes$ = of([]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show a message when there are no recipes', () => {
    component.recipes$ = of([]);
    fixture.detectChanges();

    const messageElement = fixture.nativeElement.querySelector(
      '.no-recipes-message'
    );
    expect(messageElement).toBeTruthy();
    expect(messageElement.textContent).toContain('No recipes found');
  });

  it('should display the correct number of recipes', () => {
    const recipeElements =
      fixture.nativeElement.querySelectorAll('div.recipe-card');
    expect(recipeElements.length).toEqual(mockRecipes.length);
  });

  it('should handle errors while fetching recipes', () => {
    const error = new Error('Failed to fetch recipes');

    const recipeServiceSpy = jest.spyOn(
      TestBed.inject(RecipeService),
      'getRecipes'
    );
    recipeServiceSpy.mockReturnValue(throwError(error) as Observable<never>);

    // Assign the error observable to component.recipes$
    component.recipes$ = throwError(error) as Observable<never>;

    fixture.detectChanges();

    const errorDebugElement = fixture.debugElement.query(
      By.css('.error-message-container')
    );
    expect(errorDebugElement).toBeTruthy();

    const errorTemplate =
      errorDebugElement.nativeElement.querySelector('.error-message');
    expect(errorTemplate).toBeTruthy();
    expect(errorTemplate.textContent).toContain(
      'Error: Failed to fetch recipes'
    );
  });
});
