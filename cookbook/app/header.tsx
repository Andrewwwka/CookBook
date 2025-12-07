import Link from "next/link";

export default function Header() {
  return (
    <header className="app-header mx-auto flex items-center px-8 py-2 h-32 border-b-4 bg-white shadow-md flex justify-between">
      <h1 className="title">CookBook</h1>
      <nav className="text-lg">
        <div className="ce space-x-4">
        <Link href="/" className="">
          Home
        </Link>
        <Link href="/about" className="">
        About
        </Link>
        <Link href="/newRecipe" className="">
          New Recipe
        </Link>
        <Link href="/recipes" className="">
          Recipes
        </Link>
        </div>
        <div className= "ml-8 flex space-x-4">
          <Link href="/signup" className="">
            Sign Up
          </Link>
          <Link href="/login" className="">
            Log In
          </Link>
        </div>
      </nav>
    </header>
  );
}   