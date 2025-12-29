'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore'; 
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';

interface Recipe {
  title: string;
  description: string;
  ingredients: string;
  instructions: string;
  ownerId: string;
  imageUrl?: string;
}

export default function RecipeDetailsPage() {
  const { id } = useParams();
  const { user, loading } = useAuth();
  const router = useRouter();
  
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [fetching, setFetching] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // 🔑 New States for Editing
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editIngredients, setEditIngredients] = useState('');
  const [editInstructions, setEditInstructions] = useState('');

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push('/login');
      return;
    }

    const fetchRecipe = async () => {
      try {
        const docRef = doc(db, 'recipes', id as string);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as Recipe;
          setRecipe(data);
          // Pre-fill edit states
          setEditTitle(data.title);
          setEditDescription(data.description);
          setEditIngredients(data.ingredients);
          setEditInstructions(data.instructions);
        }
      } catch (error) {
        console.error("Error fetching recipe:", error);
      } finally {
        setFetching(false);
      }
    };

    fetchRecipe();
  }, [id, user, loading, router]);

  const handleUpdate = async () => {
    try {
      const docRef = doc(db, 'recipes', id as string);
      await updateDoc(docRef, {
        title: editTitle,
        description: editDescription,
        ingredients: editIngredients,
        instructions: editInstructions,
      });
      
      // Update local state and exit edit mode
      setRecipe({
        ...recipe!,
        title: editTitle,
        description: editDescription,
        ingredients: editIngredients,
        instructions: editInstructions,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating recipe:", error);
      alert("Failed to update recipe.");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;
    setIsDeleting(true);
    try {
      await deleteDoc(doc(db, 'recipes', id as string));
      router.push('/my-recipes');
    } catch (error) {
      console.error("Error deleting:", error);
      setIsDeleting(false);
    }
  };

  if (loading || fetching) return <p className="p-10 text-center">Loading...</p>;
  if (!recipe) return <p className="p-10 text-center">Recipe not found.</p>;

  return (
    <main className="max-w-4xl mx-auto px-8 py-12">
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => router.back()} className="text-black hover:underline">
          ← Back
        </button>

        <div className="flex gap-3">
          {user?.uid === recipe.ownerId && !isEditing && (
            <>
              <button 
                onClick={() => setIsEditing(true)}
                className="text-black px-4 py-2 rounded-md hover:opacity-90 transition"
              >
                Edit Recipe
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="text-red-600 px-4 py-2 hover:bg-red-50 rounded-md transition"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-md border">
        {isEditing ? (
          <div className="space-y-4">
            <input 
              className="text-4xl font-serif font-bold w-full border-b outline-none focus:border-headerBrown"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <input 
              className="text-gray-500 italic w-full border-b outline-none"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
              <div>
                <h3 className="font-bold mb-2">Ingredients</h3>
                <textarea 
                  className="w-full h-64 p-2 border rounded"
                  value={editIngredients}
                  onChange={(e) => setEditIngredients(e.target.value)}
                />
              </div>
              <div>
                <h3 className="font-bold mb-2">Instructions</h3>
                <textarea 
                  className="w-full h-64 p-2 border rounded"
                  value={editInstructions}
                  onChange={(e) => setEditInstructions(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex gap-4 mt-6">
              <button onClick={handleUpdate} className="bg-green-600 text-white px-6 py-2 rounded-md">Save Changes</button>
              <button onClick={() => setIsEditing(false)} className="bg-gray-200 px-6 py-2 rounded-md">Cancel</button>
            </div>
          </div>
          
        ) : (
          <>
        {recipe.imageUrl && (
            <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden border">
                <Image 
                    src={recipe.imageUrl} 
                    alt={recipe.title} 
                    fill 
                    className="object-cover"
                    priority // Helps the image load faster
                    />
                </div>
            )}

            <h1 className="text-4xl font-serif font-bold text-headerBrown mb-4">{recipe.title}</h1>
            <p className="text-gray-500 italic mb-8">{recipe.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold mb-4 border-b pb-2">Ingredients</h2>
                <p className="whitespace-pre-wrap text-gray-700">{recipe.ingredients}</p>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4 border-b pb-2">Instructions</h2>
                <p className="whitespace-pre-wrap text-gray-700">{recipe.instructions}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}