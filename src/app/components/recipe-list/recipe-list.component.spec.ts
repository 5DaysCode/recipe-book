import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeListComponent } from './recipe-list.component';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../interfaces/recipe.interface';
import { Observable, of } from 'rxjs';

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Add more tests here as needed
});
