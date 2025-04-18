// Import modules with require-like syntax to avoid TypeScript import issues
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

// Define ClassValue type if it's not available from the import
type ClassValue = string | number | boolean | undefined | null | { [key: string]: boolean } | ClassValue[];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}