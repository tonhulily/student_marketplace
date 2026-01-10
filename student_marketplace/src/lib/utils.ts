import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const getAvatarUrl = (seed: string) => {
  // Luôn dùng seed là email hoặc id để ảnh giống nhau mọi nơi
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
};