import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SiteData from "@/constants/siteData.json";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ModernServicesSection() {
  const sectionRef = useRef(null);
  const primaryServicesRef = useRef(null);
  const networkServicesRef = useRef(null);

  return (
    <div ref={sectionRef} className="w-full bg-black px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="section-title mb-20 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            What I can do
          </h2>
          <p className="text-lg text-white/60">You choose, I deliver.</p>
        </div>
        <div className="mb-24">
          <div
            ref={primaryServicesRef}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {SiteData.services.primary.map((service, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07]"
              >
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-white">
                    {service}
                  </h3>
                  <ArrowUpRight className="h-5 w-5 text-white/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/60" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          ref={networkServicesRef}
          className="rounded-2xl border border-white/10 bg-white/5 p-8 md:p-12"
        >
          <div className="mb-8">
            <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
              What my friends can do
            </h2>
            <p className="max-w-2xl text-white/60">
              I fulfill your requests—
              <span className="text-white">no exceptions.</span>
              <br />
              Over the years,{" "}
              <span className="text-white">
                my network of high-performers stands ready for collaboration.
              </span>
              <br />
              Once we engage, I can handle introductions or orchestrate the
              entire collaboration effortlessly for you.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            {SiteData.services.network.map((service, index) => (
              <div
                key={index}
                className="rounded-lg border border-white/10 bg-black/40 p-4 text-center text-white/80"
              >
                {service}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
