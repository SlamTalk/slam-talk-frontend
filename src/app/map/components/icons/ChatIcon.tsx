import React from 'react';

export const ChatIcon = (
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
  <svg
    width="24"
    height="24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2 10c0-4.005 3.732-7 8-7s8 2.995 8 7-3.732 7-8 7a8.973 8.973 0 01-3.228-.592l-3.614.58a1 1 0 01-1.113-1.286l.8-2.563A6.285 6.285 0 012 10zm8 8.167c-.942 0-1.855-.123-2.716-.351C8.736 19.763 11.257 21 14 21c1.145 0 2.237-.21 3.228-.592l3.614.58a1 1 0 001.113-1.286l-.8-2.563A6.285 6.285 0 0022 14c0-2.172-1.098-4.047-2.783-5.308.076.424.116.86.116 1.308 0 4.673-4.353 8.167-9.333 8.167z"
      fill="currentColor"
    />
  </svg>
);
