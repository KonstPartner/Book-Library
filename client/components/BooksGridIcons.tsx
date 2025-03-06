'use client';

import React, { useEffect, useState } from 'react';
import {
  Book,
  BookA,
  BookAudio,
  BookCheck,
  BookCopy,
  BookDashed,
  BookDown,
  BookHeadphones,
  BookHeart,
  BookImage,
  BookKey,
  BookLock,
  BookMarked,
  BookMinus,
  BookOpen,
  BookOpenCheck,
  BookOpenText,
  BookPlus,
  BookText,
  BookType,
} from 'lucide-react';

const bookIcons = [
  Book,
  BookA,
  BookAudio,
  BookCheck,
  BookCopy,
  BookDashed,
  BookDown,
  BookHeadphones,
  BookHeart,
  BookImage,
  BookKey,
  BookLock,
  BookMarked,
  BookMinus,
  BookOpen,
  BookOpenCheck,
  BookOpenText,
  BookPlus,
  BookText,
  BookType,
];

const animationPairs = [
  [0, 4],
  [8, 3],
  [12, 7],
  [16, 11],
  [19, 15],
  [2, 6],
  [10, 1],
  [14, 5],
  [18, 9],
  [13, 17],
];

const BooksGridIcons = () => {
  const [animatedIndices, setAnimatedIndices] = useState<number[]>(
    animationPairs[0]
  );

  useEffect(() => {
    let pairIndex = 0;
    const interval = setInterval(() => {
      pairIndex = (pairIndex + 1) % animationPairs.length;
      setAnimatedIndices(animationPairs[pairIndex]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-4 sm:grid-cols-5 gap-6 my-16">
      {bookIcons.map((Icon, index) => (
        <Icon
          key={index}
          className={`text-indigo-500 dark:text-teal-400 mx-auto transition-all duration-1000 ${
            animatedIndices.includes(index) ? 'animate-float' : ''
          } hover:transform hover:-translate-y-2 hover:scale-125`}
          size={58}
        />
      ))}
    </div>
  );
};

export default BooksGridIcons;
