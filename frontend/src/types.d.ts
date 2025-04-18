// Custom declarations for modules without types
declare module 'clsx' {
  export default function clsx(...inputs: any[]): string;
  export type ClassValue = string | number | boolean | undefined | null | { [key: string]: boolean } | ClassValue[];
}

declare module 'tailwind-merge' {
  export function twMerge(...inputs: string[]): string;
}