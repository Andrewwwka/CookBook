const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export async function fetchRandomMeal() {
  const url = `${BASE_URL}/random.php`;

  try {
    const response = await fetch(url, {
      // Set to no-store to ensure a new random meal on every page load
      cache: 'no-store' 
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // The random meal is in an array called 'meals', so we return the first one
    return data.meals ? data.meals[0] : null; 
  } catch (error) {
    console.error("Failed to fetch random meal:", error);
    return null; 
  }
}