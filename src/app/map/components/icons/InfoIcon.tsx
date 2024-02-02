import React from 'react';

export const InfoIcon = (
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
  <svg
    height={20}
    width={20}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m0 0h24v24h-24z"
      fill="currentColor"
      opacity="0"
      transform="matrix(-1 0 0 -1 24 24)"
    />
    <path
      d="m12 2a10 10 0 1 0 10 10 10 10 0 0 0 -10-10zm1 14a1 1 0 0 1 -2 0v-5a1 1 0 0 1 2 0zm-1-7a1 1 0 1 1 1-1 1 1 0 0 1 -1 1z"
      fill="currentColor"
    />
  </svg>
);
