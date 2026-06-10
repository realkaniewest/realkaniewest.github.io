import { cn } from "@/lib/utils";
import type { Lang } from "@/i18n";

export function LanguageToggle({ lang, onToggle, className }: { lang: Lang; onToggle: () => void; className?: string }) {
  const isEn = lang === "en";

  return (
    <button
      type="button"
      className={cn(
        "flex h-8 w-16 cursor-pointer rounded-full border p-1 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        isEn ? "border-sky-300 bg-white" : "border-zinc-800 bg-zinc-950",
        className,
      )}
      onClick={onToggle}
      aria-label={isEn ? "Switch to Russian" : "Переключить на английский"}
      aria-pressed={isEn}
    >
      <span className="flex w-full items-center justify-between">
        <span className={cn("grid h-6 w-6 place-items-center rounded-full text-sm transition-transform duration-300", isEn ? "translate-x-8 bg-sky-100" : "translate-x-0 bg-zinc-800")}>
          {isEn ? "🇺🇸" : "🇷🇺"}
        </span>
        <span className={cn("grid h-6 w-6 place-items-center rounded-full text-sm transition-transform duration-300", isEn ? "-translate-x-8" : "bg-transparent")}>
          {isEn ? "🇷🇺" : "🇺🇸"}
        </span>
      </span>
    </button>
  );
}
