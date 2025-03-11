import CinematicGrid from "@/components/CinematicGrid";
import HeroSection from "@/components/home/hero-section";
import { Badge } from "@/components/ui/badge";
import SiteData from "@/constants/siteData.json";
import { ArrowUpRight } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: SiteData.default.title,
  description: SiteData.default.description,
};

export const dynamic = "force-static";
export const revalidate = 3600;

export default function HomePage() {
  const { testimonials } = SiteData.home;

  return (
    <main className="flex min-h-screen w-full flex-col gap-10 md:gap-14 px-4 py-16 md:pt-44 sm:px-6 lg:px-8 bg-background text-foreground">
      <CinematicGrid />

      {/* Hero Section */}
      <HeroSection />

      <div className="w-full bg-muted/30 py-1 sm:py-24 lg:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <Badge className="mb-4">Services</Badge>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              What I offer
            </h2>
            <p className="text-lg text-muted-foreground">
              Comprehensive solutions tailored to your specific needs and goals
            </p>
          </div>

          <div className="mb-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {SiteData.services.primary.map((service, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-xl border border-border bg-card/5 p-6 transition-all duration-300 hover:border-primary/20 hover:bg-card/10"
                >
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-semibold text-foreground">
                      {service}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card/5 p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                What my friends can do
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                I fulfill your requests—
                <span className="text-foreground"> no exceptions.</span>
                <br />
                Over the years,{" "}
                <span className="text-foreground">
                  my network of high-performers stands ready for collaboration.
                </span>
                <br />
                Once we engage, I can handle introductions or orchestrate the
                entire collaboration effortlessly for you.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {SiteData.services.network.map((service, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-border bg-background/40 p-4 text-center text-muted-foreground"
                >
                  {service}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section id="services" className="w-full">
        <div className="bg-background text-foreground">
          <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-10 overflow-x-hidden px-5">
            <header className="mx-auto flex flex-col gap-5 text-center">
              <Badge className="mx-auto">Testimonials</Badge>

              <h2 className="text-3xl font-medium md:text-4xl text-foreground">
                Client Success Stories: <br />
                Your Success is My Mission.
              </h2>

              <p className="text-muted-foreground">
                In my journey as a freelancer, it&apos;s the successful
                partnerships and satisfied clients that truly measure my impact.
                <br /> Hear directly from those who&apos;ve transformed their
                businesses with my services (including my friends)
              </p>
            </header>
            <div className="mx-auto grid w-full max-w-4xl grid-cols-3 gap-5 pt-5 sm:pt-20">
              {testimonials.map((testimonial, index) => (
                <a
                  key={index}
                  href={testimonial.website}
                  className="group col-span-3 flex flex-col items-center justify-center gap-7 rounded-xl border border-border bg-card p-5 py-10 md:p-10"
                >
                  <div className="flex cursor-pointer flex-col items-center gap-14 sm:flex-row sm:items-start">
                    <div className="h-20 w-20 relative">
                      <Image
                        src={testimonial.logoPath}
                        alt={testimonial.company}
                        fill
                        className={`object-contain`}
                      />
                    </div>

                    <div className="flex flex-col gap-10">
                      <p className="text-2xl font-medium underline-offset-4 group-hover:underline text-foreground">
                        {testimonial.company}
                        <ArrowUpRight className="ml-2 hidden h-5 w-5 transition-transform group-hover:inline-block group-hover:text-muted-foreground" />
                      </p>
                      <div className="flex flex-col gap-3">
                        <p className="text-xs text-muted-foreground">
                          {testimonial.person} | {testimonial.position} |{" "}
                          {testimonial.company}
                        </p>
                        <div className="relative z-10 max-w-md flex-1 rounded-lg bg-secondary p-3 text-sm">
                          <Image
                            src={testimonial.tailImagePath}
                            width={100}
                            height={100}
                            alt={testimonial.company}
                            className={`absolute hidden dark:block -bottom-1 -left-2 z-0 h-7 w-7 rotate-45`}
                          />
                          <p
                            className="relative z-10 text-secondary-foreground"
                            dangerouslySetInnerHTML={{
                              __html: testimonial.testimonial,
                            }}
                          ></p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3 items-start">
                        <p className="text-xs text-muted-foreground">
                          Technologies Used
                        </p>
                        <div className="h-14 relative">
                          <Image
                            src={testimonial.techImagePath}
                            alt="Client technologies used"
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
