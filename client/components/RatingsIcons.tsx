import React from 'react';
import {
  Annoyed,
  Ban,
  CircleCheckBig,
  Frown,
  Laugh,
  MessageCircleMore,
  Star,
  ThumbsUp,
  ThumbsDown,
} from 'lucide-react';

const FallingIcons = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
      <Annoyed
        className="absolute left-[5%] w-12 h-12 text-pink-400 dark:text-white animate-fall"
        style={{ top: '-10%', animationDelay: '0s' }}
      />
      <Ban
        className="absolute left-[8%] w-14 h-14 text-red-400 dark:text-purple-400 animate-fall"
        style={{ top: '-10%', animationDelay: '-10s' }}
      />
      <CircleCheckBig
        className="absolute left-[6%] w-16 h-16 text-green-400 dark:text-amber-400 animate-fall"
        style={{ top: '-10%', animationDelay: '-50s' }}
      />
      <Star
        className="absolute left-[7%] w-10 h-10 text-yellow-300 dark:text-amber-400 animate-fall"
        style={{ top: '-10%', animationDelay: '-30s' }}
      />
      <ThumbsUp
        className="absolute left-[9%] w-12 h-12 text-green-300 dark:text-white animate-fall"
        style={{ top: '-10%', animationDelay: '-40s' }}
      />

      <Frown
        className="absolute right-[5%] w-12 h-12 text-blue-400 dark:text-white animate-fall"
        style={{ top: '-10%', animationDelay: '-5s' }}
      />
      <Laugh
        className="absolute right-[7%] w-14 h-14 text-yellow-400 dark:text-purple-400 animate-fall"
        style={{ top: '-10%', animationDelay: '-15s' }}
      />
      <MessageCircleMore
        className="absolute right-[6%] w-16 h-16 text-purple-400 dark:text-amber-400 animate-fall"
        style={{ top: '-10%', animationDelay: '-25s' }}
      />
      <ThumbsDown
        className="absolute right-[8%] w-14 h-14 text-red-300 dark:text-purple-400 animate-fall"
        style={{ top: '-10%', animationDelay: '-55s' }}
      />
      <Frown
        className="absolute right-[9%] w-12 h-12 text-pink-400 dark:text-white animate-fall"
        style={{ top: '-10%', animationDelay: '-45s' }}
      />

      <Star
        className="absolute left-[30%] w-10 h-10 text-pink-300 dark:text-yellow-300 animate-fall"
        style={{ top: '-10%', animationDelay: '-20s' }}
      />
      <ThumbsUp
        className="absolute right-[35%] w-12 h-12 text-green-300 dark:text-white animate-fall"
        style={{ top: '-10%', animationDelay: '-35s' }}
      />
      <ThumbsDown
        className="absolute left-[40%] w-14 h-14 text-red-300 dark:text-purple-400 animate-fall"
        style={{ top: '-10%', animationDelay: '-65s' }}
      />
      <Laugh
        className="absolute left-[35%] w-12 h-12 text-yellow-400 dark:text-purple-400 animate-fall"
        style={{ top: '-10%', animationDelay: '-70s' }}
      />
      <Annoyed
        className="absolute right-[30%] w-12 h-12 text-blue-400 dark:text-white animate-fall"
        style={{ top: '-10%', animationDelay: '-75s' }}
      />

      <Ban
        className="absolute left-[10%] w-14 h-14 text-red-400 dark:text-purple-400 animate-fall"
        style={{ top: '-10%', animationDelay: '-80s' }}
      />
      <CircleCheckBig
        className="absolute right-[10%] w-16 h-16 text-green-400 dark:text-amber-400 animate-fall"
        style={{ top: '-10%', animationDelay: '-85s' }}
      />
      <MessageCircleMore
        className="absolute left-[15%] w-12 h-12 text-purple-400 dark:text-amber-400 animate-fall"
        style={{ top: '-10%', animationDelay: '-90s' }}
      />
      <Star
        className="absolute right-[15%] w-10 h-10 text-pink-300 dark:text-yellow-300 animate-fall"
        style={{ top: '-10%', animationDelay: '-6.95s' }}
      />
      <Annoyed
        className="absolute left-[12%] w-12 h-12 text-pink-400 dark:text-white animate-fall"
        style={{ top: '-10%', animationDelay: '-100s' }}
      />
      <Laugh
        className="absolute right-[12%] w-14 h-14 text-yellow-400 dark:text-purple-400 animate-fall"
        style={{ top: '-10%', animationDelay: '-105s' }}
      />
    </div>
  );
};

export default FallingIcons;
