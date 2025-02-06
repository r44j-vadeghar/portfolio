import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Code, Palette, Server } from "lucide-react";
import SiteData from "@/constants/siteData.json";
import CinematicGrid from "./CinematicGrid";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  {
    icon: Code,
    label: "Frontend Development",
    color: "text-blue-400",
    delay: 0
  },
  {
    icon: Server,
    label: "Backend Architecture",
    color: "text-green-400",
    delay: 0.1
  },
  {
    icon: Palette,
    label: "UI/UX Design",
    color: "text-purple-400",
    delay: 0.2
  }
];

export default function ModernHero() {
  const containerRef = useRef(null);
  const skillsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { duration: 0.2, ease: "power2.out" }
      });
      gsap.set(".skill-item", { opacity: 0, y: 30 });
      tl.from(containerRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.1,
        ease: "power2.out",
        delay: 0.5
      });
      if (skillsRef.current) {
        const skillItems = gsap.utils.toArray<HTMLElement>(".skill-item");

        tl.to(skillItems, {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          ease: "power2.out"
        });
        ScrollTrigger.create({
          trigger: skillsRef.current,
          start: "top center+=100",
          once: true,
          animation: tl
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-full bg-black px-4 pt-20">
      <CinematicGrid />
      <div ref={containerRef} className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h1 className="mb-6 bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-4xl leading-tight font-bold text-transparent md:text-6xl lg:text-7xl">
            {SiteData.personal.tagline}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-white/60">
            {SiteData.personal.shortDescription}
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <a
              href={SiteData.personal.calendlyUrl}
              className="group hover:bg-opacity-90 relative overflow-hidden rounded-full bg-white px-6 py-3 font-medium text-black transition-all"
            >
              <span className="relative z-10 flex items-center gap-2">
                Book a free meeting
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-10"></div>
            </a>
          </div>
        </div>
        <div ref={skillsRef} className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {skills.map(({ icon: Icon, label, color }) => (
            <div
              key={label}
              className="skill-item group relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07]"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-transparent to-white/[0.02] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <Icon className={`mb-4 h-8 w-8 ${color}`} />
              <h3 className="mb-2 text-xl font-semibold text-white">{label}</h3>
              <p className="text-white/60">
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
