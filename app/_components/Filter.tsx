'use client';

import { useState } from 'react';

export default function Filter({ onFilter }: { onFilter: (category: string) => void }) {
  const [activeCategory, setActiveCategory] = useState<string>('all'); 

  const categories = [
    'all',
    'business',
    'technology',
    'health',
    'science',
    'entertainment',
    'sports',
  ];

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category); 
    onFilter(category); 
  };

  return (
    <div className="flex space-x-4 p-4 flex-wrap">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryClick(category)}
          className={`px-4 py-2 rounded m-2 ${
            category === activeCategory
              ? 'bg-blue-600 text-white underline dark:bg-slate-800' // Active button styles
              : 'bg-blue-400 text-gray-800 hover:bg-blue-500 dark:bg-slate-400 dark:text-white dark:hover:bg-slate-700' // Inactive button styles
          }`}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      ))}
    </div>
  );
}
