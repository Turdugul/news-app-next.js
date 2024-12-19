'use client'
import { useState } from 'react';
import Link from 'next/link';
import DarkModeToggle from './DarkModeToggle';

export default function Header() {
  const [showCategories, setShowCategories] = useState(false);
  const categories = ['business', 'technology', 'health', 'science', 'entertainment', 'sports'];

  const closeCategories = () => {
    setShowCategories(false);
  };

  return (
    <header className="bg-blue-600 text-white dark:bg-slate-700 p-4">
      <div className="container mx-auto flex justify-items-start items-center">
        <h1 className="text-xl flex-1 font-bold">News App</h1>
        <nav className="flex items-center justify-end space-x-4">
          <Link href="/" className="px-3 hover:underline">Home</Link>
          
          <button
            onMouseEnter={() => setShowCategories(true)}
            onMouseLeave={closeCategories}
            className="px-3 hover:underline focus:outline-none"
          >
            Categories
          </button>

          {showCategories && (
            <div
              className="absolute bg-white text-gray-800 rounded-lg shadow-lg top-12 right-0 mt-2 py-2 w-48"
              onMouseEnter={() => setShowCategories(true)}
              onMouseLeave={closeCategories}
            >
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/categories/${category}`}
                  className="block px-4 py-2 hover:bg-blue-600 dark:hover:bg-slate-500 hover:text-white"
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Link>
              ))}
            </div>
          )}

          <DarkModeToggle />
        </nav>
      </div>
    </header>
  );
}
