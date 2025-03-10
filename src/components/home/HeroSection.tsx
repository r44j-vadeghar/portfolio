import SiteData from "@/constants/siteData.json";
import { ArrowRight, Code, Database, PaintBucket } from "lucide-react";

const skills = [
  {
    icon: <Code className="w-8 h-8 text-blue-400" />,
    label: "Frontend Development",
    color: "blue",
    delay: 0,
  },
  {
    icon: <Database className="w-8 h-8 text-green-400" />,
    label: "Backend Architecture",
    color: "green",
    delay: 0.1,
  },
  {
    icon: <PaintBucket className="w-8 h-8 text-purple-400" />,
    label: "UI/UX Design",
    color: "purple",
    delay: 0.2,
  },
];

export default function HeroSection() {
  return (
    <div className="relative w-full bg-background">
      {/* <CinematicGrid /> */}
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 text-center">
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
              <span className="relative z-10 flex items-center gap-2">
                Book a free meeting
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 translate-y-full transition-all duration-300 z-0 hover:opacity-10 hover:translate-y-0"></div>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skills.map(({ icon, label, color }) => (
            <div
              key={label}
              className="relative rounded-2xl border border-border bg-accent/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-accent hover:bg-accent/10"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-transparent to-accent/5 opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
              <div className="mb-4">{icon}</div>
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
      </div>
    </div>
  );
}
