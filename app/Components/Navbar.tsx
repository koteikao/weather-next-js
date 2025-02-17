"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { github } from "@/app/utils/icons";
import { useTheme } from "next-themes";
import { ThemeSwitcher } from "./ThemeSwitcher/ThemeSwitcher";
import Search from "./Search/Search";

export default function Navbar() {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="w-full py-4 flex items-center justify-between">
      <div className="left"></div>
      <div className="search-container flex shrink-0 w-full gap-2 sm:w-fit">
        <Search />
        <div className="btn-group flex  items-center gap-2">
          <ThemeSwitcher
            className={`flex cursor-pointer items-center transition-transform duration-500 ${
              isDark ? "rotate-180" : "rotate-0"
            }`}
          />
          <Button
            className="source-code flex items-center gap-2"
            onClick={() =>
              router.push("https://github.com/koteikao/weather-next-js")
            }
          >
            {github} Source Code
          </Button>
        </div>
      </div>
    </div>
  );
}
