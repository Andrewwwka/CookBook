import Image from "next/image";
import RecipeRecommendation from "./components/recipeReccomendation";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Welcome to your personalized CookBook!</h1>
      <p className="mt-4 text-lg">
        What recipe would you like to make today?
      </p>
      <div className="mt-8">
        <Image
          src="/window.svg"
          alt="Cookbook Illustration"
          width={300}
          height={200}
        />
      </div>
      <RecipeRecommendation />
    </main>
  );
}
