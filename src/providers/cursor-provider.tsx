"use client";

import { MousePointer, MousePointerClick } from "lucide-react";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";

type CursorContextType = {
  showNormalCursor: boolean;
  toggleCursor: () => void;
};

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export function CursorProvider({ children }: { children: ReactNode }) {
  const [showNormalCursor, setShowNormalCursor] = useState(false);

  useEffect(() => {
    const savedCursorPref = localStorage.getItem("showNormalCursor");
    if (savedCursorPref !== null) {
      setShowNormalCursor(JSON.parse(savedCursorPref));
    }
  }, []);

  const toggleCursor = () => {
    const newValue = !showNormalCursor;
    setShowNormalCursor(newValue);
    localStorage.setItem("showNormalCursor", JSON.stringify(newValue));
    toast.message("Cursor preference updated", {
      icon: newValue ? (
        <MousePointer size={18} />
      ) : (
        <MousePointerClick size={18} />
      ),
      description: `${
        newValue ? "Using default cursor now" : "Using context aware cursor"
      }`,
    });
  };

  useEffect(() => {
    document.body.style.cursor = showNormalCursor ? "auto" : "none";
  }, [showNormalCursor]);

  return (
    <CursorContext.Provider value={{ showNormalCursor, toggleCursor }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const context = useContext(CursorContext);
  if (context === undefined) {
    throw new Error("useCursor must be used within a CursorProvider");
  }
  return context;
}
