import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">News App</h1>
        <nav>
          <Link href="/" className="px-3 hover:underline">
            Home
          </Link>
          <Link href="/categories" className="px-3 hover:underline">
            Categories
          </Link>
        </nav>
      </div>
    </header>
  );
}
