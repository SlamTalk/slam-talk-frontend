'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Switch } from '@nextui-org/react';
import { FaMoon } from 'react-icons/fa';
import { IoMdSunny } from 'react-icons/io';

const ThemeSwitcher: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDarkMode = theme === 'dark';

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };
  return (
    <Switch
      defaultSelected
      checked={isDarkMode}
      size="sm"
      color="primary"
      onChange={() => handleThemeChange(isDarkMode ? 'light' : 'dark')}
      // eslint-disable-next-line react/no-unstable-nested-components
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <IoMdSunny className={className} />
        ) : (
          <FaMoon className={className} />
        )
      }
    />
  );
};

export default ThemeSwitcher;
