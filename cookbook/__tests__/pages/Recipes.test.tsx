import { render, screen } from '@testing-library/react';
import MealPage from '@/app/recipes/[id]/page';
import { mockRecipe } from '../mocks/recipeMock';

// 1. Mock the API call so it doesn't try to hit TheMealDB
jest.mock('@/lib/themealdb', () => ({
  getMealDetails: jest.fn(() => Promise.resolve({
    idMeal: '52772',
    strMeal: 'Teriyaki Chicken',
    strCategory: 'Chicken',
    strArea: 'Japanese',
    strMealThumb: 'https://www.themealdb.com/images/teriyaki.jpg',
    strInstructions: 'Cook the chicken...',
    strIngredient1: 'Chicken',
    strMeasure1: '1lb',
  })),
}));

// 2. Mock the Save Button (it uses Firebase, which we don't need to test here)
jest.mock('@/components/SaveRecipeButton', () => {
  return function DummyButton() {
    return <button>Save Recipe</button>;
  };
});

describe('MealPage Server Component', () => {
  it('renders recipe details correctly', async () => {
    // 3. Resolve the Async Component manually
    const params = Promise.resolve({ id: '52772' });
    const PageJSX = await MealPage({ params });

    render(PageJSX);

    // 4. Check for the elements
    expect(screen.getByText('Teriyaki Chicken')).toBeInTheDocument();
    expect(screen.getByText(/Category: Chicken/i)).toBeInTheDocument();
    expect(screen.getByText('1lb Chicken')).toBeInTheDocument();
  });
});