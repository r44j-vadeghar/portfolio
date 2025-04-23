import siteData from "@/constants/siteData.json";
import { forwardRef } from "react";

const StatsSection = forwardRef<HTMLElement>((props, ref) => {
  return (
    <section ref={ref} className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {siteData.home.stats.map((stat, index) => (
            <div key={index} className="stat-item text-center">
              <h3 className="text-4xl font-bold text-primary mb-2">
                {stat.value}
              </h3>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

StatsSection.displayName = "StatsSection";

export default StatsSection;
