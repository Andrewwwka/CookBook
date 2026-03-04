// __tests__/mocks/recipeMock.ts
import { Meal } from '@/lib/themealdb';

export const mockMeal: Meal = ({
  idMeal: '52772',
  strMeal: 'Teriyaki Chicken',
  strMealThumb: 'https://www.themealdb.com/images/teriyaki.jpg',
  strCategory: 'Chicken',
  strArea: 'Japanese',
  strInstructions: '1. Heat oil... 2. Add chicken...',
} as unknown) as Meal;

export const mockMealList: Meal[] = [
  mockMeal,
  { ...mockMeal, idMeal: '999', strMeal: 'Beef Stew' }
];