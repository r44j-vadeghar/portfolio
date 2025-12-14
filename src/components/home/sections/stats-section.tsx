"use client";

import { NumberTicker } from "@/components/ui/number-ticker";
import siteData from "@/constants/siteData.json";
import { forwardRef } from "react";

function extractNumber(value: string): { num: number; suffix: string } {
  const match = value.match(/^(\d+)(.*)$/);
  if (match) {
    return { num: parseInt(match[1], 10), suffix: match[2] };
  }
  return { num: 0, suffix: value };
}

const StatsSection = forwardRef<HTMLElement>((props, ref) => {
  return (
    <section ref={ref} className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {siteData.home.stats.map((stat, index) => {
            const { num, suffix } = extractNumber(stat.value);
            return (
              <div key={index} className="stat-item text-center">
                <h3 className="text-4xl font-bold text-primary mb-2">
                  {num > 0 ? (
                    <>
                      <NumberTicker value={num} />
                      {suffix}
                    </>
                  ) : (
                    stat.value
                  )}
                </h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

StatsSection.displayName = "StatsSection";

export default StatsSection;
