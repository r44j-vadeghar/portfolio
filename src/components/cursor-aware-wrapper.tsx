"use client";

import { useCursor } from "@/providers/cursor-provider";
import { ContextAwareCursor } from "./cursors/context-aware-cursor";

export default function CursorAwareWrapper() {
  const { showNormalCursor } = useCursor();
    return !showNormalCursor ? <ContextAwareCursor /> : null;
}