import React from 'react';

export const FeeIcon = (
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
  <svg
    fill="none"
    height="20"
    viewBox="0 0 24 24"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m6 12 2 7 2-7m-4 0-2-7m2 7h-3m3 0h4m4 0 2 7 2-7m-4 0-2-7-2 7m4 0h-4m4 0h4m0 0 2-7m-2 7h3"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);
