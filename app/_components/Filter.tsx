'use client';

export default function Filter({ onFilter }: { onFilter: (category: string) => void }) {
  const categories = ['all', 'business', 'technology', 'health', 'science'];

  return (
    <div className="flex space-x-4 p-4">
      {categories.map((news) => (
        <button
          key={news}
          onClick={() => onFilter(news)}
          className="px-4 py-2 bg-blue-500 text-white rounded dark:bg-slate-700  hover:bg-blue-700"
        >
          {news.charAt(0).toUpperCase() + news.slice(1)}
        </button>
      ))}
    </div>
  );
}
