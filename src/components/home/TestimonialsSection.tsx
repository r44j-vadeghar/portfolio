import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Image } from "astro:assets";
import Kairos from "@/assets/testimonials/kairos.png";
import Tail from "@/assets/testimonials/tail.png";
import KairosTechnologiesList from "@/assets/testimonials/kairos-technologies-list.png";

gsap.registerPlugin(ScrollTrigger);

export default function ModernTestimonials() {
  const sectionRef = useRef(null);

  // useEffect(() => {
  //   const ctx = gsap.context(() => {
  //     // Fade in section title
  //     gsap.from(sectionRef.current.querySelector(".section-title"), {
  //       opacity: 0,
  //       y: 30,
  //       duration: 0.8,
  //       scrollTrigger: {
  //         trigger: sectionRef.current,
  //         start: "top center+=100",
  //       },
  //     });

  //     // Fade in testimonials
  //     gsap.from(sectionRef.current.querySelectorAll(".testimonial-card"), {
  //       opacity: 0,
  //       y: 30,
  //       stagger: 0.2,
  //       duration: 0.8,
  //       scrollTrigger: {
  //         trigger: sectionRef.current.querySelector(".testimonials-grid"),
  //         start: "top center+=100",
  //       },
  //     });
  //   });

  //   return () => ctx.revert();
  // }, []);

  return (
    <div ref={sectionRef} className="w-full bg-black px-4 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="section-title mb-20 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Client Success Stories
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-white/60">
            In my journey as a freelancer, it's the successful partnerships and
            satisfied clients that truly measure my impact. Hear directly from
            those who've transformed their businesses with my services.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="testimonials-grid grid gap-8">
          {/* Kairos Club Testimonial */}
          <div className="testimonial-card transform-gpu rounded-2xl border border-white/10 bg-white/5 p-8 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07]">
            <div className="mb-8 flex items-center gap-6">
              <img
                src={Kairos.src}
                alt="Kairos club"
                className="h-16 w-16 rounded-full"
              />
              <div>
                <h3 className="text-xl font-semibold text-white">
                  Kairos Club
                </h3>
                <p className="text-sm text-white/60">
                  Janhvi Rawat | Marketing Head
                </p>
              </div>
            </div>

            <div className="relative mb-8 rounded-xl bg-black/40 p-6">
              <img
                src={Tail.src}
                alt="quote tail"
                className="absolute -top-3 -left-3 h-6 w-6 rotate-45"
              />
              <p className="text-white/80">
                Raj and Subhash transformed our vision into a stunning reality
                for Kairos Club. Their expertise and dedication shone through,
                delivering a website that brilliantly captures our essence. The
                seamless blend of design and functionality showcases their
                talent.
              </p>
            </div>

            <div>
              <p className="mb-4 text-sm text-white/60">Technologies Used</p>
              <img
                src={KairosTechnologiesList.src}
                alt="Technologies used"
                className="h-12 object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
