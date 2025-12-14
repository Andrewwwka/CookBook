// components/Header.tsx

'use client';

import Link from "next/link";
import { useAuth } from '@/context/AuthContext' // 🔑 Import the Auth Context hook
import { useRouter } from 'next/navigation'

export default function Header() {
  const { user, loading, logout } = useAuth(); // 🔑 Get user state and logout function
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    // Redirect user to the home page after logging out
    router.push('/'); 
  };
  
  // --- Loading State ---
  // Renders a minimal header while Firebase checks the user status
  if (loading) {
    return (
        <header className="app-header px-8 py-2 h-32 border-b-4 shadow-md text-white">
          <div className="flex justify-between items-center w-full max-w-7xl mx-auto h-full">
             <h1 className="text-4xl font-serif font-bold tracking-wider">CookBook</h1>
             <p>Loading...</p>
          </div>
        </header>
    );
  }


  return (
    <header className="app-header px-8 py-2 h-32 border-b-4 shadow-md bg-headerBrown text-white">
      
      <div className="flex justify-between items-center w-full max-w-7xl mx-auto h-full">

        {/* (Logo/Home Link) */}
        <Link href="/" className="flex-shrink-0">
          <h1 className="text-4xl font-serif font-bold tracking-wider ">
            CookBook
          </h1>
        </Link>

        {/* MIDDLE SECTION - NAVIGATION LINKS */}
        <nav className="flex-grow flex justify-center text-lg">
          <div className="space-x-8">
            <Link href="/" className="text-white hover:underline">
              Home
            </Link>
            <Link href="/about" className="text-white hover:underline">
              About
            </Link>
            {/* 🔑 Only show New Recipe and My Recipes if the user is logged in */}
            {user && (
              <>
                <Link href="/newRecipe" className="text-white hover:underline">
                  New Recipe
                </Link>
                <Link href="/my-recipes" className="text-white hover:underline">
                  My Recipes
                </Link>
              </>
            )}
          </div>
        </nav>

        {/* (Auth Links) - DYNAMIC SECTION */}
        <div className="flex-shrink-0 flex space-x-4 text-lg font-medium">
          {user ? (
            // --- LOGGED-IN STATE ---
            <>
              <span className="self-center text-sm font-light">
                {user.email}
              </span>
              <button
                onClick={handleLogout} 
                className="px-4 py-2 bg-black text-white border border-white rounded-md hover:bg-gray-100 transition"
              >
                Logout
              </button>
            </>
          ) : (
            // --- LOGGED-OUT STATE ---
            <>
              <Link 
                href="/signup" 
                className="px-4 py-2 bg-black border border-white rounded-md hover:bg-gray-700 transition"
              >
                Sign Up
              </Link>
              <Link 
                href="/login" 
                className="px-4 py-2 bg-black border border-white rounded-md hover:bg-gray-700 transition"
              >
                Log In
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}