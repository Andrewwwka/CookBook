'use client';

import { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function NewRecipePage() {
  const { user } = useAuth();
  const router = useRouter();

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return alert("You must be logged in!");

    setIsSubmitting(true);

    try {
      // 🔑 The Magic: Adding a document to the "recipes" collection
      await addDoc(collection(db, 'recipes'), {
        title,
        description,
        ingredients,
        instructions,
        ownerId: user.uid, // Linking this recipe to the logged-in user
        createdAt: serverTimestamp(), // Useful for sorting later
      });

      // Send the user back to their recipes list
      router.push('/my-recipes');
    } catch (error) {
      console.error("Error adding recipe: ", error);
      alert("Failed to save recipe. Check console.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="max-w-3xl mx-auto px-8 py-12">
      <h1 className="text-4xl font-serif font-bold text-headerBrown mb-8">Create New Recipe</h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-md border">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Recipe Title</label>
          <input
            required
            type="text"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-headerBrown outline-none"
            placeholder="e.g. Grandma's Famous Lasagna"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
          <input
            type="text"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-headerBrown outline-none"
            placeholder="A hearty meal for the whole family"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ingredients</label>
          <textarea
            rows={4}
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-headerBrown outline-none"
            placeholder="List ingredients here..."
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Instructions</label>
          <textarea
            rows={6}
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-headerBrown outline-none"
            placeholder="Step 1: Preheat oven..."
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 py-3 border border-gray-300 text-black rounded-md "
          >
            {isSubmitting ? 'Saving...' : 'Save Recipe'}
          </button>
        </div>
      </form>
    </main>
  );
}