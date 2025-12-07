import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full p-4 bg-red-600 text-white flex justify-between items-center">
      <h1 className="text-2xl font-bold">CookBook</h1>
      <nav>
        <Link href="/" className="mr-4 hover:underline">
          Home
        </Link>
        <Link href="/recipes" className="hover:underline">
          Recipes
        </Link>
      </nav>
    </header>
  );
}   