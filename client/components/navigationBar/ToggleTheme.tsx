'use client';

import React, { useEffect } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import ThemeType from '@/types/ThemeType';

const ToggleTheme = ({
  theme,
  setTheme,
}: {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}) => {
  const applyTheme = (newTheme: 'light' | 'dark') => {
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    const systemPrefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    if (theme === 'system') {
      applyTheme(systemPrefersDark ? 'dark' : 'light');
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        applyTheme(e.matches ? 'dark' : 'light');
      };
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      applyTheme(theme);
    }
  }, [theme]);

  const handleThemeChange = (newTheme: ThemeType) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className="flex items-center justify-between w-36 h-12 bg-white/10 dark:bg-black/10 backdrop-blur-md rounded-lg p-2 relative cursor-pointer border border-indigo-200/30 shadow-md">
      <button
        onClick={() => handleThemeChange('light')}
        className={`relative p-2 rounded-full transition-colors group ${
          theme === 'light'
            ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white'
            : 'bg-transparent text-indigo-100 dark:text-indigo-400 hover:bg-indigo-200/20 dark:hover:bg-indigo-900/20'
        }`}
        title="Light Theme"
      >
        <Sun className="w-5 h-5" />
      </button>
      <button
        onClick={() => handleThemeChange('dark')}
        className={`relative p-2 rounded-full transition-colors group ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white'
            : 'bg-transparent text-indigo-100 dark:text-indigo-400 hover:bg-indigo-200/20 dark:hover:bg-indigo-900/20'
        }`}
        title="Dark Theme"
      >
        <Moon className="w-5 h-5" />
      </button>
      <button
        onClick={() => handleThemeChange('system')}
        className={`relative p-2 rounded-full transition-colors group ${
          theme === 'system'
            ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white'
            : 'bg-transparent text-indigo-100 dark:text-indigo-400 hover:bg-indigo-200/20 dark:hover:bg-indigo-900/20'
        }`}
        title="System Theme"
      >
        <Monitor className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ToggleTheme;
