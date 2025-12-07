import Image from "next/image";

export default function About() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">About CookBook</h1>
      <p className="mt-4 text-lg max-w-2xl text-center">
        CookBook is your personalized recipe manager, designed to help you organize,
        discover, and share your favorite recipes. Whether you are a seasoned chef or just
        starting out in the kitchen, CookBook provides an intuitive platform to keep all
        your culinary inspirations in one place.
      </p>
      <div className="mt-8 border rounded-lg overflow-hidden shadow-lg"> 
        <Image 
          src="/chef.jpeg"
          alt="chef image"
          width={300}
          height={200}
        / >
      </div>
    </main>
  );
}   