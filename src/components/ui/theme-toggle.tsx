import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const saved = window.localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const isDark = theme === "dark";

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    window.localStorage.setItem("theme", theme);
  }, [isDark, theme]);

  return (
    <button
      type="button"
      className={cn(
        "flex h-8 w-16 cursor-pointer rounded-full border p-1 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        isDark ? "border-zinc-800 bg-zinc-950" : "border-zinc-300 bg-white",
        className,
      )}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Включить светлую тему" : "Включить тёмную тему"}
      aria-pressed={isDark}
    >
      <span className="flex w-full items-center justify-between">
        <span
          className={cn(
            "flex h-6 w-6 items-center justify-center rounded-full transition-transform duration-300",
            isDark ? "translate-x-0 bg-zinc-800" : "translate-x-8 bg-gray-200",
          )}
        >
          {isDark ? <Moon className="h-4 w-4 text-white" strokeWidth={1.5} /> : <Sun className="h-4 w-4 text-gray-800" strokeWidth={1.5} />}
        </span>
        <span className={cn("flex h-6 w-6 items-center justify-center rounded-full transition-transform duration-300", isDark ? "bg-transparent" : "-translate-x-8")}> 
          {isDark ? <Sun className="h-4 w-4 text-gray-500" strokeWidth={1.5} /> : <Moon className="h-4 w-4 text-black" strokeWidth={1.5} />}
        </span>
      </span>
    </button>
  );
}
