'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import phrases from '@/data/encouragePhrases.json';

const EncouragePhrases = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentPhrase, setCurrentPhrase] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const getRandomPhrase = () => {
    const randomIndex = Math.floor(Math.random() * phrases.length);
    return phrases[randomIndex];
  };

  useEffect(() => {
    setCurrentPhrase(getRandomPhrase());
  }, []);

  useEffect(() => {
    if (!currentPhrase) return;

    let typingTimeout: NodeJS.Timeout;
    let pauseTimeout: NodeJS.Timeout;

    if (isTyping) {
      if (charIndex < currentPhrase.length) {
        typingTimeout = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, 75);
      } else {
        pauseTimeout = setTimeout(() => {
          setIsTyping(false);
          setCharIndex(charIndex - 1);
        }, 4000);
      }
    } else {
      if (charIndex >= 0) {
        typingTimeout = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, charIndex));
          setCharIndex(charIndex - 1);
        }, 15);
      } else {
        const newPhrase = getRandomPhrase();
        setCurrentPhrase(newPhrase);
        setIsTyping(true);
        setCharIndex(0);
      }
    }

    return () => {
      clearTimeout(typingTimeout);
      clearTimeout(pauseTimeout);
    };
  }, [charIndex, isTyping, currentPhrase]);

  return (
    <div className="flex items-start justify-start gap-4 relative md:my-5 py-5 h-36 sm:h-44 lg:w-3/4 lg:mr-0 lg:ml-auto">
      <BookOpen className="hidden sm:block w-16 h-16 lg:w-32 lg:h-32 gradient-icon animate-gradient flex-shrink-0 my-auto" />
      <span className="hidden sm:block w-1.5 h-full lg:h-36 bg-gradient-to-b from-gray-400 via-blue-500 to-purple-500 dark:from-green-700 dark:via-indigo-400 dark:to-teal-500 rounded-full flex-shrink-0" />
      <div className="flex-1 text-left">
        <span
          className="text-2xl font-medium gradient-text inline-block"
          data-text={displayText}
        >
          {displayText}
          <span className="inline-block w-3 h-6 bg-gray-800 dark:bg-teal-300 animate-blink ml-1 align-middle" />
        </span>
      </div>
    </div>
  );
};

export default EncouragePhrases;
