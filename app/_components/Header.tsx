
'use client'

import Link from 'next/link';
import DarkModeToggle from './DarkModeToggle'; // Import the DarkModeToggle component

export default function Header() {
  return (
    <header className="bg-blue-600 text-white dark:bg-slate-700 p-4">
      <div className="container mx-auto flex justify-items-start items-center">
        <h1 className="text-xl flex-1 font-bold">News App</h1>
        <nav className="flex items-center justify-end space-x-4">
          <Link href="/" className="px-3 hover:underline">
            Home
          </Link> 
          <DarkModeToggle />
        </nav>
      </div>
    </header>
  );
}




