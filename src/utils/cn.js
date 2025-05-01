import { twMerge } from "tailwind-merge"

// Utility function to conditionally join class names
export function cn(...inputs) {
  return twMerge(inputs.filter(Boolean).join(" "))
}

