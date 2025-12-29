'use client';

import { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

interface Meal {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    [key: string]: string; // This allows for the strIngredient1, strMeasure1 dynamic keys
  }

export default function SaveRecipeButton({ meal }: { meal: Meal }) {
  const { user } = useAuth();
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!user) {
      alert("Please log in to save recipes!");
      router.push('/login');
      return;
    }

    setIsSaving(true);

    try {
      // Clean up ingredients from the MealDB format
      let ingredientsList = "";
      for (let i = 1; i <= 20; i++) {
        const ing = meal[`strIngredient${i}`];
        const meas = meal[`strMeasure${i}`];
        if (ing && ing.trim() !== "") {
          ingredientsList += `${meas} ${ing}\n`;
        }
      }

      await addDoc(collection(db, 'recipes'), {
        title: meal.strMeal,
        description: `Recommended ${meal.strCategory} dish from ${meal.strArea}`,
        ingredients: ingredientsList,
        instructions: meal.strInstructions,
        ownerId: user.uid,
        createdAt: serverTimestamp(),
        imageUrl: meal.strMealThumb // Store image too!
      });

      alert("Recipe saved to your cookbook!");
      router.push('/my-recipes');
    } catch (error) {
      console.error("Error saving recipe:", error);
      alert("Something went wrong saving the recipe.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <button 
      onClick={handleSave}
      disabled={isSaving}
      className="mt-4 ml-3 px-4 py-2 bg-gray-200 text-black rounded hover:bg-opacity-90 transition disabled:opacity-50"
    >
      {isSaving ? 'Saving...' : 'Save to My Cookbook'}
    </button>
  );
}