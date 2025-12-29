import { fetchRandomMeal } from "@/lib/themealdb";
import Image from "next/image";
import Link from "next/link";

export default async function RecipeRecommendation() {
  const meal = await fetchRandomMeal();

  if (!meal) {
    return <div className="text-center p-8">No recommendation available at the moment.</div>;
  }

  return (
    <section className="p-4 border rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-2">Recipe Reccomendation of the Day</h2>

      <div className="md:flex gap-8 items-start">
        <div className="md:span-1">
            <Image
                src={meal.strMealThumb}
                alt={meal.strMeal}
                width={200}
                height={200}
                className="w-full h-auto rounded-lg"
            />
            <button className="mt-4 px-4 py-2 bg-headerBrown text-white rounded hover:bg-opacity-90 transition">
                View Recipe
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
          <Link href={`/recipes/${meal.idMeal}`} className="font-bold">
            Read More...
          </Link>
        </div>

      </div>
    </section>
  );
}