// components/Search.tsx

'use client';

import { useState } from 'react';

export default function Search({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    onSearch(newQuery); // Pass the query to the parent component when it changes
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search for news..."
        className="px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500 dark:bg-slate-800 dark:text-white dark:border-slate-600"
      />
    </div>
  );
}
