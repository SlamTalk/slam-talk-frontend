import type { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/react';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        md: '600px', // md 브레이크포인트를 600px로 설정
      },
    },
  },
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: '#FFFFFF',
            primary: {
              DEFAULT: '#FF634A',
            },
          },
        },
        dark: {
          colors: {
            background: '#000000',
            primary: {
              DEFAULT: '#FF634A',
            },
          },
        },
      },
    }),
  ],
};
export default config;
