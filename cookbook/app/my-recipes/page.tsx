'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase'; 
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

// Define what a Recipe looks like
interface Recipe {
  id: string;
  title: string;
  description: string;
  ownerId: string;
}

export default function MyRecipesPage() {
  const { user, loading } = useAuth();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [fetching, setFetching] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // 1. If not loading and no user, send them to login
    if (!loading && !user) {
      router.push('/login');
      return;
    }

    // 2. Fetch recipes if user exists
    const fetchRecipes = async () => {
      if (!user) return;
      
      try {
        const q = query(
          collection(db, 'recipes'), 
          where('ownerId', '==', user.uid)
        );
        
        const querySnapshot = await getDocs(q);
        const recipeData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Recipe[];

        setRecipes(recipeData);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setFetching(false);
      }
    };

    if (user) {
      fetchRecipes();
    }
  }, [user, loading, router]);

  if (loading || fetching) {
    return <div className="p-10 text-center">Loading your cookbook...</div>;
  }

  return (
    <main className="max-w-7xl mx-auto px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-serif font-bold text-headerBrown">My Recipes</h1>
        <button 
          onClick={() => router.push('/newRecipe')}
          className=" text-black px-6 py-2 rounded-full hover:opacity-90 transition"
        >
          + Add New Recipe
        </button>
      </div>

      {recipes.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed">
          <p className="text-xl text-gray-500">You have not saved any recipes yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <Link href={`/my-recipes/${recipe.id}`} key={recipe.id} className="no-underline">
            <div key={recipe.id} className="border rounded-lg p-6 shadow-sm hover:shadow-md transition">
              <h2 className="text-2xl font-bold mb-2">{recipe.title}</h2>
              <p className="text-gray-600 mb-4 line-clamp-3">{recipe.description}</p>
              <button className="text-headerBrown font-semibold hover:underline">
                View Details →
              </button>
            </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}  

  
        