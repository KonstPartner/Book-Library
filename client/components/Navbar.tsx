import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-purple-600 dark:bg-purple-800 p-4 shadow-md">
      <div className="container mx-auto flex items-center">
        <Link href="/">
          <h1 className="text-2xl font-bold text-gray-100 dark:text-gray-200">
            Book Library App
          </h1>
        </Link>

        <div className="text-xl pl-20 flex space-x-8">
          <Link
            href="/"
            className="border-b-2 border-transparent text-gray-100 dark:text-gray-200 hover:text-white hover:border-white"
          >
            Random
          </Link>
          <Link
            href="/books"
            className="border-b-2 border-transparent text-gray-100 dark:text-gray-200hover:text-white hover:border-white"
          >
            Search
          </Link>
          <Link
            href="/books/create"
            className="border-b-2 border-transparent text-gray-100 dark:text-gray-200hover:text-white hover:border-white"
          >
            Create
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
