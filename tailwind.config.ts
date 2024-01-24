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
      colors: {
        kakao: '#FEE500',
        naver: '#03C75A',
      },
      screens: {
        sm: { max: '499px' }, // 499px까지는 sm으로 적용
        md: '600px', // 600px 이상의 화면에서 고정
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
            danger: {
              DEFAULT: '#FF4C5E',
            },
          },
        },
        dark: {
          colors: {
            background: '#000000',
            primary: {
              DEFAULT: '#FF634A',
            },
            danger: {
              DEFAULT: '#FF4C5E',
            },
          },
        },
      },
    }),
  ],
};
export default config;
