// src/app/about/page.tsx
import CinematicGrid from "@/components/CinematicGrid";
import Organization from "@/components/about/Organization";
import SocialLinks from "@/components/about/SocialLinks";
import siteData from "@/constants/siteData.json";
import Socials from "@/constants/socials";
import { Code, Database, Globe, Paintbrush, Rocket, Zap } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import { unstable_ViewTransition as ViewTransition } from "react";

export const dynamic = "force-static";
export const revalidate = 3600;

type IconName = keyof typeof iconMap;

const iconMap = {
  Code,
  Database,
  Globe,
  Paintbrush,
  Rocket,
  Zap,
};

const getIconComponent = (iconName: string) => {
  return iconMap[iconName as IconName] || Zap;
};

export const metadata: Metadata = {
  title: "About - R44J Vadeghar | Full Stack Developer",
  description:
    "Full Stack Developer with expertise in building modern web applications and chrome extensions",
  alternates: {
    canonical: "https://r44j.dev/about",
  },
};

export default function AboutPage() {
  const { skills, keyAchievements, experience } = siteData.about;

  return (
    <main className="bg-background text-foreground">
      <CinematicGrid />

      <div className="mx-auto max-w-6xl px-4 md:py-16 md:pt-44">
        {/* Hero Section */}
        <div className="mb-16 grid items-center gap-10 md:grid-cols-2">
          <div>
            <Image
              src="/linkedin.jpg"
              alt="Raj Vadeghar"
              width={400}
              height={400}
              className="mx-auto mb-6 hidden rounded-full border-4 border-border md:mx-0 md:block"
            />
          </div>
          <div>
            <h1 className="text-center sm:text-left mb-4 text-3xl sm:text-4xl font-bold">
              Vadeghar Raja Narayana
            </h1>
            <p className="text-center sm:text-left mb-6 text-2xl text-muted-foreground">
              Full Stack Developer | Innovation Architect
            </p>
            <div className="mb-6 rounded-xl border border-border bg-card/50 p-6">
              <p className="text-card-foreground">
                I&apos;m a systems thinker transforming complex challenges into
                elegant digital solutions. With a blend of technical expertise
                and creative problem-solving, I bridge the gap between
                innovative ideas and functional technologies.
              </p>
              <SocialLinks socials={Socials} />
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-16">
          <h2 className="mb-10 text-center text-3xl font-bold">
            Technical Expertise
          </h2>
          <ViewTransition name="skills">
            <div className="grid gap-6 md:grid-cols-3">
              {skills.map(({ iconName, label, description, color }) => {
                const Icon = getIconComponent(iconName);
                return (
                  <div
                    key={label}
                    className="group relative overflow-hidden rounded-xl border border-border bg-card/50 p-6 transition-all hover:border-border/80"
                  >
                    <Icon className={`mb-4 h-10 w-10 ${color}`} />
                    <h3 className="mb-2 text-xl font-semibold">{label}</h3>
                    <p className="text-muted-foreground">{description}</p>
                  </div>
                );
              })}
            </div>
          </ViewTransition>
        </div>

        {/* Key Achievements */}
        <div className="mb-16 rounded-xl border border-border bg-card/50 p-8">
          <h2 className="mb-8 text-center text-3xl font-bold">
            Notable Achievements
          </h2>
          <ul className="space-y-4">
            {keyAchievements.map((achievement, index) => (
              <li key={index} className="flex items-start">
                <Zap className="mt-1 mr-4 flex-shrink-0 text-yellow-400" />
                <span className="text-card-foreground">{achievement}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Professional Experience */}
        <div>
          <h2 className="mb-10 text-center text-3xl font-bold">
            Professional Journey
          </h2>
          <div className="flex flex-col space-y-6">
            {experience.map((org, index) => (
              <Organization
                key={index}
                title={org.title}
                span={org.span}
                jobType={org.jobType}
                designation={org.designation}
                link={org.link}
                logo={org.logoPath}
              >
                <p>{org.description}</p>
              </Organization>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
