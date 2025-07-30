import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme, Theme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const themes: { value: Theme; icon: React.ComponentType<any>; label: string }[] = [
    { value: 'light', icon: Sun, label: 'Light' },
    { value: 'dark', icon: Moon, label: 'Dark' },
    { value: 'grey', icon: Monitor, label: 'Grey' }
  ];

  return (
    <div className="flex items-center bg-theme-card rounded-lg p-1 border border-theme-border">
      {themes.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            theme === value
              ? 'bg-theme-primary text-white shadow-sm'
              : 'text-theme-text-secondary hover:text-theme-text-primary hover:bg-theme-hover'
          }`}
          title={`Switch to ${label} theme`}
        >
          <Icon className="h-4 w-4" />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  );
};

export default ThemeToggle;