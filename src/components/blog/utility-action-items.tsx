"use client";
import { ChevronUp, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";

function UtilityActionItems() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="mt-5 flex items-center justify-start gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        aria-label="Toggle theme"
        className="h-8 w-8 rounded-md"
        title={
          theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
        }
      >
        {theme === "dark" ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )}
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
        className="h-8 w-8 rounded-md"
        title="Scroll to top"
      >
        <ChevronUp className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default UtilityActionItems;
