

export default function Home() {

  

  return (
    <main className="flex-1 bg-[--light-bg] dark:bg-[#141314] text-black dark:text-white">
  <section>
    <div className="min-h-screen flex items-center bg-[--light-bg] dark:bg-[#141314]">
      <div className="max-w-3xl mx-auto px-8 py-16">
        <h1 className="text-6xl font-normal mb-6 tracking-normal text-black dark:text-white">
          Welcome to my blog
        </h1>
        <div className="space-y-1 text-gray-800 mb-8 dark:text-white">
          <p>Material 3 is the latest version of Google's open-source design system.</p>
          <p>Design and build beautiful, usable products with Material 3.</p>
        </div>
        <button className="bg-purple-600 text-white px-8 py-3 rounded-full hover:bg-purple-700 transition-colors duration-200 dark:text-white">
          Get started
        </button>
      </div>
    </div>
  </section>
</main>
  );
}