import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { PropsWithChildren, useCallback, useEffect, useRef } from "react";
import { Button } from "../ui/button";

export function MagneticButton({
  children,
  onClick,
}: PropsWithChildren & {
  onClick: () => void;
}) {
  const ref = useRef<HTMLButtonElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = useCallback(
    (e: globalThis.MouseEvent) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distance = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
      );

      // Only activate magnetic effect when cursor is close
      if (distance < 100) {
        x.set((e.clientX - centerX) / 2);
        y.set((e.clientY - centerY) / 2);
      } else {
        x.set(0);
        y.set(0);
      }
    },
    [x, y]
  );

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <Button onClick={onClick} asChild>
      <motion.button
        ref={ref}
        onMouseLeave={handleMouseLeave}
        style={{
          x: springX,
          y: springY,
          scale: useTransform(springX, [-20, 0, 20], [1.05, 1, 1.05]),
        }}
        className="relative px-6 py-3 rounded-full"
      >
        {children}
      </motion.button>
    </Button>
  );
}
