'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Switch } from '@nextui-org/react';
import { FaMoon } from 'react-icons/fa';
import { IoMdSunny } from 'react-icons/io';

const ThemeSwitcher: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      className="my-2"
      defaultSelected
      checked={isDarkMode}
      size="md"
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
    >
      화면 테마 설정
    </Switch>
  );
};

export default ThemeSwitcher;
