import { fetchRandomMeal } from "@/lib/themealdb";
import Image from "next/image";
import Link from "next/link";

export default async function RecipeRecommendation() {
  const meal = await fetchRandomMeal();

  if (!meal) {
    return <div className="text-center p-8">No recommendation available at the moment.</div>;
  }

  return (
    /* Changes: 
       - Added 'border-2 border-gray-200' for a visible outer box
       - Added 'bg-white' and 'shadow-lg' to make it feel more premium
    */
    <section className="p-6 md:p-8 -mx-4 md:mx-0 bg-white border-2 border-black-200 rounded-none md:rounded-2xl shadow-lg padding-6 md:padding-8">
      <h2 className="text-xl md:text-2xl font-bold mb-6 text-center md:text-left text-gray-800 tracking-tight">
        Recipe Recommendation of the Day
      </h2>

      <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-start">
        
        {/* IMAGE SECTION */}
        <div className="w-full md:w-1/3 max-w-[320px] md:max-w-none">
            <Image
                src={meal.strMealThumb}
                alt={meal.strMeal}
                width={400}
                height={400}
                className="w-full h-auto rounded-xl shadow-md object-cover aspect-square border border-gray-100"
            />
        </div>

        {/* TEXT SECTION */}
        <div className="flex-1 text-center md:text-left flex flex-col justify-center">
          <h3 className="text-3xl md:text-4xl font-extrabold mb-2 leading-tight text-gray-900">
            {meal.strMeal}
          </h3>
          <p className="text-sm md:text-lg font-semibold text-gray-500 mb-4 uppercase tracking-widest">
            {meal.strCategory} • {meal.strArea}
          </p>
          <p className="text-gray-600 line-clamp-3 md:line-clamp-5 leading-relaxed mb-6 text-base italic">
          &ldquo;{meal?.strInstructions || "No instructions provided for this recipe."}&rdquo;
          </p>
          
          {/* BUTTON BORDER: 
              - 'border-2 border-headerBrown' makes the button look solid and intentional
              - 'hover:bg-headerBrown hover:text-white' creates a nice interaction
          */}
          <Link 
            href={`/recipes/${meal.idMeal}`} 
            className="inline-block w-full md:w-max px-8 py-3 bg-white text-headerBrown border-2 border-headerBrown rounded-xl font-bold text-center transition-all duration-200 hover:bg-headerBrown hover:text-white active:scale-95 shadow-sm"
          >
            View Full Recipe
          </Link>
        </div>

      </div>
    </section>
  );
}