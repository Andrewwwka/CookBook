import Image from "next/image";

export default function About() {
  return (
    <main className="flex min-h-screen flex-col items-center px-6 py-12 md:p-24">
      <h1 className="text-3xl md:text-4xl font-bold text-center">About CookBook</h1>
      
      <p className="mt-6 text-base md:text-lg max-w-2xl text-center leading-relaxed text-gray-700">
        CookBook is your personalized recipe manager, designed to help you organize,
        discover, and share your favorite recipes. Whether you are a seasoned chef or just
        starting out in the kitchen, CookBook provides an intuitive platform to keep all
        your culinary inspirations in one place.
      </p>

      <div className="mt-10 border rounded-lg overflow-hidden shadow-lg w-full max-w-[300px]"> 
        <Image 
          src="/chef.jpeg"
          alt="chef image"
          width={300}
          height={200}
          className="w-full h-auto object-cover"
        />
      </div>
    </main>
  );
}