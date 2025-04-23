"use client";

import { motion } from "framer-motion";
import { forwardRef } from "react";

import siteData from "@/constants/siteData.json";

const AchievementsSection = forwardRef<HTMLElement>((props, ref) => {
  return (
    <section ref={ref} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Key Achievements</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Highlights from my professional journey that demonstrate my impact
            and expertise
          </p>
        </div>

        <div className="space-y-4">
          {siteData.about.keyAchievements.map((achievement, index) => (
            <motion.div
              key={index}
              // initial={{ opacity: 0, x: -20 }}
              // whileInView={{ opacity: 1, x: 0 }}
              // transition={{ duration: 0.5, delay: index * 0.1 }}
              // viewport={{ once: true }}
              className="achievement-item flex items-start gap-4 p-4 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                {index + 1}
              </div>
              <p className="pt-1">{achievement}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

AchievementsSection.displayName = "AchievementsSection";

export default AchievementsSection;
