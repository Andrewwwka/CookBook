// __tests__/mocks/recipeMock.ts

export const mockRecipe = {
    idMeal: '52772',
    strMeal: 'Teriyaki Chicken Casserole',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/wvpsxx1468256351.jpg',
    strInstructions: 'Preheat oven to 350° F. Spray a 9x13-inch baking dish with non-stick spray...',
    strCategory: 'Chicken',
    strArea: 'Japanese',
  };
  
  // An array of recipes for testing your search results page
  export const mockRecipeList = [mockRecipe, { ...mockRecipe, idMeal: '999', strMeal: 'Beef Stew' }];