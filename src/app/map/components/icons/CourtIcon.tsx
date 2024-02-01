import React from 'react';

export const CourtIcon = (
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
  <svg
    width="20"
    height="20"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 5H21.4C21.7314 5 22 5.26863 22 5.6V18.4C22 18.7314 21.7314 19 21.4 19H12M12 5H2.6C2.26863 5 2 5.26863 2 5.6V18.4C2 18.7314 2.26863 19 2.6 19H12M12 5V19"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12C15 13.6569 13.6569 15 12 15Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 17C4.76142 17 7 14.7614 7 12C7 9.23858 4.76142 7 2 7"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22 17C19.2386 17 17 14.7614 17 12C17 9.23858 19.2386 7 22 7"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
