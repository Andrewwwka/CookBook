import { fetchRandomMeal } from "@/lib/themealdb";
import Image from "next/image";

export default async function RecipeRecommendation() {
  const meal = await fetchRandomMeal();

  if (!meal) {
    return <div className="text-center p-8">No recommendation available at the moment.</div>;
  }

  return (
    <section className="p-4 border rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-2">Recipe Reccomendation of the Day</h2>

      <div className="md:flex gap-8 items-start">
        <div className="md:w-1/3">
            <Image
                src={meal.strMealThumb}
                alt={meal.strMeal}
                width={300}
                height={300}
                className="w-full h-auto rounded-lg"
            />
            <button className="mt-4 px-4 py-2 bg-headerBrown text-white rounded hover:bg-opacity-90 transition">
                View Recipe
            </button>
            <button className="mt-4 ml-2 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-opacity-90 transition">
                Save to My Cookbook
            </button>
        </div>

        <div className="md:w-2/3 mt-6 md:mt-0">
          <h3 className="text-4xl font-extrabold mb-3">{meal.strMeal}</h3>
          <p className="text-lg font-medium text-gray-600 mb-4">
            Category: {meal.strCategory} | Area: {meal.strArea}
          </p>
          <p className="text-gray-700 line-clamp-4">
            {meal.strInstructions}
          </p>
          <a href={`/recipes/${meal.idMeal}`} className="text-blue-600 hover:underline">
            Read More...
          </a>
        </div>

      </div>
    </section>
  );
}