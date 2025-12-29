import { getMealDetails } from '@/lib/themealdb';
import Image from 'next/image';
import SaveRecipeButton from '@/components/SaveRecipeButton'; // 1. Import your button

interface MealPageProps {
  params: Promise<{ // Note: In newer Next.js versions, params is a Promise
    id: string;
  }>;
}

type IndexableMeal = { [key: string]: string | null | undefined }

export default async function MealPage({ params }: MealPageProps) {
  // Await the params before using the id
  const { id } = await params;
  const meal = await getMealDetails(id);

  if (!meal) {
    return <div className="p-12 text-center text-xl">Meal not found</div>;
  }

  const indexableMeal = meal as IndexableMeal;
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = indexableMeal[`strIngredient${i}`];
    const measure = indexableMeal[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== '') {
      ingredients.push(`${measure ? measure.trim() : ''} ${ingredient.trim()}`);
    }
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4">{meal.strMeal}</h1>
      <p className="text-lg text-gray-600 mb-8">Category: {meal.strCategory} | Area: {meal.strArea}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-1">
          <Image
            src={meal.strMealThumb}
            alt={meal.strMeal}
            width={400} // Increased width for better resolution
            height={400}
            className="rounded-lg shadow-xl mb-6 w-full h-auto object-cover"
          />

          {/* 🔑 2. DROP THE BUTTON HERE */}
          <div className="mb-8">
            <SaveRecipeButton meal={meal} />
          </div>

          <h2 className="text-2xl font-semibold mb-3">Ingredients</h2>
          <ul className="list-disc list-inside text-gray-700">
            {ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
          <div className="text-gray-700 space-y-4 whitespace-pre-line">
            {meal.strInstructions}
          </div>
        </div>
      </div>
    </main>
  );
}