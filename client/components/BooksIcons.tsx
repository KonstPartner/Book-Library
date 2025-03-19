import React from 'react';
import {
  BookCheck,
  BookA,
  BookHeadphones,
  BookImage,
  BookUser,
  BookHeart,
  BookOpenCheck,
  BookText,
  BookMarked,
  BookOpenText,
} from 'lucide-react';

const BooksIcons = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <BookCheck
        className="absolute top-[5%] left-[5%] w-12 h-12 sm:left-[5%] text-pink-400 dark:text-white animate-scale"
        style={{ transform: 'rotate(10deg)', opacity: 0.7 }}
      />
      <BookImage
        className="absolute bottom-[5%] right-[5%] w-16 h-16 sm:right-[5%] text-blue-400 dark:text-amber-400 animate-scale"
        style={{ transform: 'rotate(-15deg)', opacity: 0.7 }}
      />
      <BookHeadphones
        className="absolute top-[15%] left-[5%] w-10 h-10 sm:left-[5%] text-yellow-400 dark:text-purple-400 animate-tilt-right"
        style={{ transform: 'rotate(5deg)', opacity: 0.7 }}
      />
      <BookA
        className="absolute top-[25%] right-[5%] w-14 h-14 sm:right-[5%] text-green-400 dark:text-white animate-tilt-left"
        style={{ transform: 'rotate(-10deg)', opacity: 0.7 }}
      />
      <BookUser
        className="absolute bottom-[10%] left-[5%] w-20 h-20 sm:left-[5%] text-purple-400 dark:text-white animate-tilt-right"
        style={{ transform: 'rotate(8deg)', opacity: 0.7 }}
      />

      <BookHeart
        className="absolute top-[5%] right-[5%] w-17 h-17 sm:right-[5%] text-pink-400 dark:text-purple-400"
        style={{ transform: 'rotate(-20deg)', opacity: 0.7 }}
      />
      <BookOpenCheck
        className="absolute top-[35%] left-[5%] w-14 h-14 sm:left-[5%] text-blue-400 dark:text-white"
        style={{ transform: 'rotate(12deg)', opacity: 0.7 }}
      />
      <BookText
        className="absolute bottom-[25%] right-[5%] w-16 h-16 sm:right-[5%] text-yellow-400 dark:text-yellow-300"
        style={{ transform: 'rotate(-12deg)', opacity: 0.7 }}
      />
      <BookMarked
        className="absolute bottom-[25%] left-[5%] w-12 h-12 sm:left-[5%] text-green-400 dark:text-purple-400"
        style={{ transform: 'rotate(15deg)', opacity: 0.7 }}
      />
      <BookOpenText
        className="absolute top-[60%] right-[5%] w-10 h-10 sm:right-[5%] text-pink-300 dark:text-white"
        style={{ transform: 'rotate(-5deg)', opacity: 0.7 }}
      />
      <BookOpenCheck
        className="absolute bottom-[50%] right-[5%] w-14 h-14 sm:right-[5%] text-blue-300 dark:text-yellow-300"
        style={{ transform: 'rotate(8deg)', opacity: 0.7 }}
      />
      <BookHeadphones
        className="absolute top-[65%] left-[5%] w-12 h-12 sm:left-[5%] text-yellow-300 dark:text-purple-400"
        style={{ transform: 'rotate(-10deg)', opacity: 0.7 }}
      />
      <BookImage
        className="absolute bottom-[65%] right-[5%] w-16 h-16 sm:right-[5%] text-green-300 dark:text-purple-400"
        style={{ transform: 'rotate(12deg)', opacity: 0.7 }}
      />
      <BookHeart
        className="absolute top-[80%] left-[5%] w-18 h-18 sm:left-[5%] text-purple-300 dark:text-amber-400"
        style={{ transform: 'rotate(-15deg)', opacity: 0.7 }}
      />
      <BookUser
        className="absolute bottom-[80%] right-[5%] w-20 h-20 sm:right-[5%] text-pink-300 dark:text-amber-400"
        style={{ transform: 'rotate(20deg)', opacity: 0.7 }}
      />
    </div>
  );
};

export default BooksIcons;
