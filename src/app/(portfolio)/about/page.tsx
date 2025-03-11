// src/app/about/page.tsx
import ManifoldLogo from "@/assets/manifold_ventures_llc_logo.jpeg";
import TcsLogo from "@/assets/tcs-48.png";
import Organization from "@/components/about/Organization";
import SocialLinks from "@/components/about/SocialLinks";
import CinematicGrid from "@/components/CinematicGrid";
import Socials from "@/constants/socials";
import { Code, Database, Globe, Paintbrush, Rocket, Zap } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";

export const dynamic = "force-static";
export const revalidate = 3600;

const skills = [
  {
    icon: Code,
    label: "Frontend Development",
    description: "Crafting responsive, performant web interfaces",
    color: "text-blue-400",
  },
  {
    icon: Database,
    label: "Backend Architecture",
    description: "Designing scalable, efficient server-side solutions",
    color: "text-green-400",
  },
  {
    icon: Paintbrush,
    label: "UI/UX Design",
    description: "Creating intuitive, engaging user experiences",
    color: "text-purple-400",
  },
  {
    icon: Globe,
    label: "Full Stack Development",
    description: "End-to-end web solutions across technologies",
    color: "text-teal-400",
  },
  {
    icon: Rocket,
    label: "Product Innovation",
    description: "Transforming ideas into functional digital products",
    color: "text-orange-400",
  },
  {
    icon: Zap,
    label: "Performance Optimization",
    description: "Enhancing speed and efficiency of web applications",
    color: "text-yellow-400",
  },
];

const keyAchievements = [
  "Developed Chrome extensions used by 10,000+ users",
  "Optimized web application performance, reducing load times by 40%",
  "Implemented SEO strategies increasing organic traffic by 65%",
  "Created scalable architectures for multiple startup projects",
];

export const metadata: Metadata = {
  title: "About - R44J Vadeghar | Full Stack Developer",
  description:
    "Full Stack Developer with expertise in building modern web applications and chrome extensions",
  alternates: {
    canonical: "https://r44j.dev/about",
  },
};

export default function AboutPage() {
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
          <div className="grid gap-6 md:grid-cols-3">
            {skills.map(({ icon: Icon, label, description, color }) => (
              <div
                key={label}
                className="group relative overflow-hidden rounded-xl border border-border bg-card/50 p-6 transition-all hover:border-border/80"
              >
                <Icon className={`mb-4 h-10 w-10 ${color}`} />
                <h3 className="mb-2 text-xl font-semibold">{label}</h3>
                <p className="text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
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
            <Organization
              title="Tata Consultancy Services"
              span="2024 - Present"
              jobType="Full Time"
              designation="Systems Engineer"
              link="https://www.tcs.com/"
              logo={TcsLogo}
            >
              <p>Driving technological innovation and system optimization</p>
            </Organization>

            <Organization
              title="Manifold Ventures"
              span="2022 - 2024"
              jobType="Full Time"
              designation="Full Stack Developer"
              link="https://www.meavana.com"
              logo={ManifoldLogo}
            >
              <p>
                Spearheaded development of multiple digital products, from
                conceptualization to deployment, focusing on Chrome extensions
                and web applications.
              </p>
            </Organization>
          </div>
        </div>
      </div>
    </main>
  );
}
