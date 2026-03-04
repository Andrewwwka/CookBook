// components/Header.tsx

'use client';

import { useState } from 'react'; // Added for mobile menu toggle
import Link from "next/link";
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track mobile menu

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
    router.push('/'); 
  };

  // Close menu when a link is clicked
  const closeMenu = () => setIsMenuOpen(false);

  if (loading) {
    return (
        <header className="app-header px-8 py-2 border-b-4 shadow-md bg-headerBrown text-white h-20 md:h-32 flex items-center">
          <div className="flex justify-between items-center w-full max-w-7xl mx-auto">
             <h1 className="text-2xl md:text-4xl font-serif font-bold tracking-wider">CookBook</h1>
             <p className="animate-pulse">Loading...</p>
          </div>
        </header>
    );
  }

  return (
    <header className="app-header border-b-4 shadow-md bg-headerBrown text-white">
      {/* --- Main Header Bar --- */}
      <div className="flex justify-between items-center w-full max-w-7xl mx-auto px-4 md:px-8 h-20 md:h-32">
        
        {/* LOGO */}
        <Link href="/" className="flex-shrink-0" onClick={closeMenu}>
          <h1 className="text-2xl md:text-4xl font-serif font-bold tracking-wider">
            CookBook
          </h1>
        </Link>

        {/* MOBILE HAMBURGER BUTTON (Hidden on Desktop) */}
        <button 
          className="lg:hidden p-2 rounded-md hover:bg-white/10"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>

        {/* DESKTOP MIDDLE NAVIGATION (Hidden on Mobile) */}
        <nav className="hidden lg:flex flex-grow justify-center text-lg">
          <div className="space-x-8">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/about" className="hover:underline">About</Link>
            {user && (
              <>
                <Link href="/newRecipe" className="hover:underline">New Recipe</Link>
                <Link href="/my-recipes" className="hover:underline">My Recipes</Link>
              </>
            )}
          </div>
        </nav>

        {/* DESKTOP AUTH LINKS (Hidden on Mobile) */}
        <div className="hidden lg:flex flex-shrink-0 items-center space-x-4 text-lg font-medium">
          {user ? (
            <>
              <span className="text-sm font-light truncate max-w-[150px]">
                {user.email}
              </span>
              <button
                onClick={handleLogout} 
                className="px-4 py-2 bg-black text-white border border-white rounded-md hover:bg-gray-100 hover:text-black transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/signup" className="px-4 py-2 bg-black border border-white rounded-md hover:bg-gray-700 transition">
                Sign Up
              </Link>
              <Link href="/login" className="px-4 py-2 bg-black border border-white rounded-md hover:bg-gray-700 transition">
                Log In
              </Link>
            </>
          )}
        </div>
      </div>

      {/* --- MOBILE DROPDOWN MENU --- */}
      {isMenuOpen && (
        <div className="lg:hidden bg-headerBrown border-t border-white/10 px-6 py-8 space-y-6 flex flex-col">
          <Link href="/" className="text-xl border-b border-white/10 pb-2" onClick={closeMenu}>Home</Link>
          <Link href="/about" className="text-xl border-b border-white/10 pb-2" onClick={closeMenu}>About</Link>
          
          {user ? (
            <>
              <Link href="/newRecipe" className="text-xl border-b border-white/10 pb-2" onClick={closeMenu}>New Recipe</Link>
              <Link href="/my-recipes" className="text-xl border-b border-white/10 pb-2" onClick={closeMenu}>My Recipes</Link>
              <div className="pt-4">
                <p className="text-sm opacity-70 mb-4">{user.email}</p>
                <button
                  onClick={handleLogout}
                  className="w-full py-3 bg-black border border-white rounded-md text-center"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col space-y-4 pt-4">
              <Link href="/signup" onClick={closeMenu} className="w-full py-3 bg-black border border-white rounded-md text-center">
                Sign Up
              </Link>
              <Link href="/login" onClick={closeMenu} className="w-full py-3 bg-black border border-white rounded-md text-center">
                Log In
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}