import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function ParallaxSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-purple-900 to-black"
        style={{ y: backgroundY }}
      />
      <motion.div
        className="relative h-full flex items-center justify-center"
        style={{ y: textY }}
      >
        <h2 className="text-5xl font-bold text-white">Parallax Section</h2>
      </motion.div>
    </section>
  );
}
