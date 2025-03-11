"use client";
import { Badge } from "@/components/ui/badge";
import SiteData from "@/constants/siteData.json";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Code,
  Database,
  PaintBucket,
  Paintbrush,
} from "lucide-react";
import { unstable_ViewTransition as ViewTransition } from "react";

const iconMap = {
  Code,
  Database,
  Paintbrush,
  PaintBucket,
};

const getIconComponent = (iconName: keyof typeof iconMap) => {
  const Icon = iconMap[iconName] || Code; // Default to Code if icon not found
  const colorClasses: Record<string, string> = {
    blue: "text-blue-400",
    green: "text-green-400",
    purple: "text-purple-400",
  };
  const getColorClass = (iconName: string) => {
    if (iconName === "Code") return colorClasses.blue;
    if (iconName === "Database") return colorClasses.green;
    if (iconName === "Paintbrush" || iconName === "PaintBucket")
      return colorClasses.purple;
    return "text-foreground"; // Default color
  };

  return <Icon className={`w-8 h-8 ${getColorClass(iconName)}`} />;
};

function HeroSection() {
  const { skills } = SiteData.home;

  return (
    <div className="relative w-full bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6"
          >
            <Badge
              variant="outline"
              className="px-4 py-1 text-sm backdrop-blur-sm bg-background/30"
            >
              {SiteData.personal.role}
            </Badge>
          </motion.div>
          <h1 className="mb-6 text-2xl md:text-4xl lg:text-7xl font-semibold leading-tight bg-gradient-to-r from-foreground to-foreground bg-clip-text text-transparent">
            {SiteData.personal.tagline}
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            {SiteData.personal.shortDescription}
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href={SiteData.personal.calendlyUrl}
              className="relative overflow-hidden rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground transition-all duration-300 hover:shadow-lg"
            >
              <span className="relative z-10 flex items-center gap-2 group">
                Book a free meeting
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                <span className="absolute inset-0 bg-primary/10 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                {/* <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /> */}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 translate-y-full transition-all duration-300 z-0 hover:opacity-10 hover:translate-y-0"></div>
            </a>
          </div>
        </div>

        <ViewTransition name="skills">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skills.map(({ iconName, label }) => (
              <div
                key={label}
                className="relative rounded-2xl border border-border bg-accent/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-accent hover:bg-accent/10"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-transparent to-accent/5 opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
                <div className="mb-4">
                  {getIconComponent(iconName as keyof typeof iconMap)}
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">
                  {label}
                </h3>
                <p className="text-muted-foreground">
                  Delivering robust solutions with modern technologies and best
                  practices.
                </p>
              </div>
            ))}
          </div>
        </ViewTransition>
      </div>
    </div>
  );
}

export default HeroSection;
