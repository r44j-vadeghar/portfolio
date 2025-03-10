"use client";
import ClientTech from "@/assets/testimonials/kairos-technologies-list.png";
import KairosImage from "@/assets/testimonials/kairos.png";
import Tail from "@/assets/testimonials/tail.png";
import { ArrowUpRight } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function TestimonialsSection() {
  const { theme } = useTheme();

  return (
    <section id="services" className="w-full">
      <div className="bg-background text-foreground">
        <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-10 overflow-x-hidden px-5">
          <header className="mx-auto flex flex-col gap-5 text-center">
            <h2 className="text-3xl font-medium md:text-4xl text-foreground">
              Client Success Stories: <br />
              Your Success is My Mission.
            </h2>

            <p className="text-muted-foreground">
              In my journey as a freelancer, it&apos;s the successful partnerships
              and satisfied clients that truly measure my impact.
              <br /> Hear directly from those who&apos;ve transformed their
              businesses with my services (including my friends)
            </p>
          </header>
          <div className="mx-auto grid w-full max-w-4xl grid-cols-3 gap-5 pt-5 sm:pt-20">
            <a
              href="https://kairos-club.com"
              className="group col-span-3 flex flex-col items-center justify-center gap-7 rounded-xl border border-border bg-card p-5 py-10 md:p-10"
            >
              <div className="flex cursor-pointer flex-col items-center gap-14 sm:flex-row sm:items-start">
                <div className="h-20 w-20 relative">
                  <Image
                    src={KairosImage}
                    alt="kairos club"
                    fill
                    className={`object-contain`}
                  />
                </div>

                <div className="flex flex-col gap-10">
                  <p className="text-2xl font-medium underline-offset-4 group-hover:underline text-foreground">
                    Kairos Club
                    <ArrowUpRight className="ml-2 hidden h-5 w-5 transition-transform group-hover:inline-block group-hover:text-muted-foreground" />
                  </p>
                  <div className="flex flex-col gap-3">
                    <p className="text-xs text-muted-foreground">
                      Janhvi Rawat | Marketing Head | Kairos Club
                    </p>
                    <div className="relative z-10 max-w-md flex-1 rounded-lg bg-secondary p-3 text-sm">
                      {theme === "dark" && (
                        <Image
                          src={Tail}
                          alt="kairos club"
                          className={`absolute -bottom-1 -left-2 z-0 h-7 w-7 rotate-45`}
                        />
                      )}
                      <p className="relative z-10 text-secondary-foreground">
                        Raj and Subhash transformed our vision into a stunning
                        reality for Kairos Club. <br />
                        Their expertise and dedication shone through, delivering
                        a website that brilliantly captures our essence. The
                        seamless blend of design and functionality showcases
                        their talent. <br />
                        We wholeheartedly recommend their team for their
                        exceptional work and commitment to excellence. Thank you
                        for elevating our online presence.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 items-start">
                    <p className="text-xs text-muted-foreground">
                      Technologies Used
                    </p>
                    <div className="h-14 relative">
                      <Image
                        src={ClientTech}
                        alt="Client technologies used"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
