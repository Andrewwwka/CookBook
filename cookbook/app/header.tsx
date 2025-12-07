import Link from "next/link";

export default function Header() {
  return (
    <header className="app-header px-8 py-2 h-32 border-b-4 shadow-md text-white">
      
      {/* The primary container is now a flex container spanning the full width. 
        We use 'mx-auto' on the inner container for centering/width control, but removed it 
        from the header itself. 
      */}
      <div className="flex justify-between items-center w-full max-w-7xl mx-auto h-full">

        {/* (Logo/Home Link) */}
        <Link href="/" className="flex-shrink-0">
          <h1 className="text-4xl font-serif font-bold tracking-wider">
            CookBook
          </h1>
        </Link>

        {/* MIDDLE SECTION  
          'flex-grow' ensures this section takes up all available space in the middle.
          'justify-center' centers the links within this available space.
        */}
        <nav className="flex-grow flex justify-center text-lg">
          <div className="space-x-8"> {/* Increased space for better separation */}
            <Link href="/" className="hover:text-amber-200 transition">
              Home
            </Link>
            <Link href="/about" className="hover:text-amber-200 transition">
              About
            </Link>
            <Link href="/newRecipe" className="hover:text-amber-200 transition">
              New Recipe
            </Link>
            <Link href="/recipes" className="hover:text-amber-200 transition">
              Recipes
            </Link>
          </div>
        </nav>

        {/* (Auth Links) */}
        <div className="flex-shrink-0 flex space-x-4 text-lg font-medium">
          <Link 
            href="/signup" 
            className="px-4 py-2 bg-black order border border-white rounded-md "
          >
            Sign Up
          </Link>
          <Link 
            href="/login" 
            className="px-4 py-2 bg-black border border-white  rounded-md"
          >
            Log In
          </Link>
        </div>
      </div>
    </header>
  );
}