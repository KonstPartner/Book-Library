import Image from 'next/image';
import BookType from '@/types/BookType';
import getBookValues from '@/utils/getBookValues';
import Link from 'next/link';

const BookCard = ({ book }: { book: BookType }) => {
  const { id, title, author, image, publishedDate, category } =
    getBookValues(book);

  return (
    <div className="border rounded-lg p-4 shadow-sm transition-transform hover:-translate-y-1.5 border-gray-200 dark:border-transparent bg-gray-100 dark:bg-gray-700">
      <Link href={`books/${id}`}>
        <div className="flex flex-col items-center text-center">
          <div className="w-[200px] h-[250px] flex justify-center items-center overflow-hidden">
            <Image
              src={image}
              width={160}
              height={200}
              alt={`${title} Image`}
              className="object-cover rounded-md"
            />
          </div>
          <div className="mt-3 flex flex-col gap-2">
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="text-gray-600 dark:text-gray-400 min-h-[20px]">By: {author}</p>
            <p className="text-gray-600 dark:text-gray-400 min-h-[20px]">
              Published: {publishedDate}
            </p>
            {category && (
              <p className="text-orange-500 dark:text-orange-400 bg-gray-200 dark:bg-gray-600 min-h-[20px] border dark:border-transparent rounded-md mx-auto px-3">
                {category}
              </p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BookCard;
