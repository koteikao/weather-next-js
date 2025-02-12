"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeSwitcher({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDark = theme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // не рендерим кнопку на сервере
  }

  return (
    <button
      className={className}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {isDark ? (
        <Sun className="h-6 w-6 rotate-0 text-yellow-500 transition-all" />
      ) : (
        <Moon className="h-6 w-6 rotate-0 text-blue-600 transition-all" />
      )}
    </button>
  );
}
