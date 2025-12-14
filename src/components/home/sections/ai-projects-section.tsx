"use client";

import { AnimatedBeam } from "@/components/ui/animated-beam";
import { BorderBeam } from "@/components/ui/border-beam";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Bot,
  Brain,
  Database,
  Mail,
  MessageSquare,
  Search,
  Send,
  Sparkles,
  User,
  Users,
  Zap,
} from "lucide-react";
import { forwardRef, useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode; label?: string }
>(({ className, children, label }, ref) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        ref={ref}
        className={cn(
          "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-background shadow-lg transition-transform hover:scale-110",
          className
        )}
      >
        {children}
      </div>
      {label && (
        <span className="text-xs text-muted-foreground text-center max-w-20">
          {label}
        </span>
      )}
    </div>
  );
});

Circle.displayName = "Circle";

function WhatsappTeamDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const intentRef = useRef<HTMLDivElement>(null);
  const knowledgeRef = useRef<HTMLDivElement>(null);
  const webSearchRef = useRef<HTMLDivElement>(null);
  const generalRef = useRef<HTMLDivElement>(null);
  const vectorRef = useRef<HTMLDivElement>(null);
  const generateRef = useRef<HTMLDivElement>(null);
  const responseRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[300px] md:h-[400px] rounded-xl border bg-card/50 p-4 md:p-6"
    >
      <BorderBeam size={200} duration={15} />

      {/* User Input */}
      <div className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2">
        <Circle ref={userRef} className="border-green-500" label="User Message">
          <MessageSquare className="size-5 text-green-500" />
        </Circle>
      </div>

      {/* Intent Detection */}
      <div className="absolute left-[22%] top-[25%]">
        <Circle ref={intentRef} className="border-purple-500" label="Claude Haiku">
          <Brain className="size-5 text-purple-500" />
        </Circle>
      </div>

      {/* Router branches */}
      <div className="absolute top-[12%] left-1/2 -translate-x-1/2">
        <Circle ref={knowledgeRef} className="border-blue-500" label="Knowledge">
          <Database className="size-5 text-blue-500" />
        </Circle>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Circle ref={webSearchRef} className="border-amber-500" label="Web Search">
          <Search className="size-5 text-amber-500" />
        </Circle>
      </div>

      <div className="absolute bottom-[12%] left-1/2 -translate-x-1/2">
        <Circle ref={generalRef} className="border-pink-500" label="General">
          <Bot className="size-5 text-pink-500" />
        </Circle>
      </div>

      {/* Vector Search */}
      <div className="absolute right-[22%] top-[25%]">
        <Circle ref={vectorRef} className="border-cyan-500" label="pgvector">
          <Zap className="size-5 text-cyan-500" />
        </Circle>
      </div>

      {/* Generation */}
      <div className="absolute right-[22%] bottom-[25%]">
        <Circle ref={generateRef} className="border-emerald-500" label="GPT-4o-mini">
          <Sparkles className="size-5 text-emerald-500" />
        </Circle>
      </div>

      {/* Response */}
      <div className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2">
        <Circle ref={responseRef} className="border-green-500" label="Response">
          <Send className="size-5 text-green-500" />
        </Circle>
      </div>

      {/* Beams */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={userRef}
        toRef={intentRef}
        gradientStartColor="#22c55e"
        gradientStopColor="#9333ea"
        duration={2}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={intentRef}
        toRef={knowledgeRef}
        curvature={50}
        gradientStartColor="#9333ea"
        gradientStopColor="#3b82f6"
        duration={2}
        delay={0.5}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={intentRef}
        toRef={webSearchRef}
        gradientStartColor="#9333ea"
        gradientStopColor="#f59e0b"
        duration={2}
        delay={0.7}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={intentRef}
        toRef={generalRef}
        curvature={-50}
        gradientStartColor="#9333ea"
        gradientStopColor="#ec4899"
        duration={2}
        delay={0.9}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={knowledgeRef}
        toRef={vectorRef}
        gradientStartColor="#3b82f6"
        gradientStopColor="#06b6d4"
        duration={2}
        delay={1}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={vectorRef}
        toRef={generateRef}
        gradientStartColor="#06b6d4"
        gradientStopColor="#10b981"
        duration={2}
        delay={1.5}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={webSearchRef}
        toRef={generateRef}
        gradientStartColor="#f59e0b"
        gradientStopColor="#10b981"
        duration={2}
        delay={1.3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={generalRef}
        toRef={generateRef}
        curvature={-30}
        gradientStartColor="#ec4899"
        gradientStopColor="#10b981"
        duration={2}
        delay={1.3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={generateRef}
        toRef={responseRef}
        gradientStartColor="#10b981"
        gradientStopColor="#22c55e"
        duration={2}
        delay={2}
      />
    </div>
  );
}

function VCHunterDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const startupRef = useRef<HTMLDivElement>(null);
  const discoveryRef = useRef<HTMLDivElement>(null);
  const enrichmentRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const composerRef = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[300px] md:h-[400px] rounded-xl border bg-card/50 p-4 md:p-6"
    >
      <BorderBeam size={200} duration={15} delay={5} />

      {/* Startup Context */}
      <div className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2">
        <Circle ref={startupRef} className="border-blue-500" label="Startup Context">
          <User className="size-5 text-blue-500" />
        </Circle>
      </div>

      {/* Agent Pipeline */}
      <div className="absolute left-[28%] top-[18%]">
        <Circle
          ref={discoveryRef}
          className="border-purple-500"
          label="Discovery Agent"
        >
          <Search className="size-5 text-purple-500" />
        </Circle>
      </div>

      <div className="absolute left-[50%] top-[32%] -translate-x-1/2">
        <Circle
          ref={enrichmentRef}
          className="border-pink-500"
          label="Enrichment Agent"
        >
          <Database className="size-5 text-pink-500" />
        </Circle>
      </div>

      <div className="absolute left-[50%] top-[62%] -translate-x-1/2">
        <Circle
          ref={contactRef}
          className="border-amber-500"
          label="Contact Agent"
        >
          <Users className="size-5 text-amber-500" />
        </Circle>
      </div>

      <div className="absolute right-[28%] bottom-[18%]">
        <Circle
          ref={composerRef}
          className="border-emerald-500"
          label="Message Agent"
        >
          <Mail className="size-5 text-emerald-500" />
        </Circle>
      </div>

      {/* Output */}
      <div className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2">
        <Circle ref={outputRef} className="border-green-500" label="Outreach">
          <Send className="size-5 text-green-500" />
        </Circle>
      </div>

      {/* Beams */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={startupRef}
        toRef={discoveryRef}
        curvature={30}
        gradientStartColor="#3b82f6"
        gradientStopColor="#9333ea"
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={discoveryRef}
        toRef={enrichmentRef}
        gradientStartColor="#9333ea"
        gradientStopColor="#ec4899"
        duration={3}
        delay={0.8}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={enrichmentRef}
        toRef={contactRef}
        gradientStartColor="#ec4899"
        gradientStopColor="#f59e0b"
        duration={3}
        delay={1.6}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={contactRef}
        toRef={composerRef}
        gradientStartColor="#f59e0b"
        gradientStopColor="#10b981"
        duration={3}
        delay={2.4}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={composerRef}
        toRef={outputRef}
        curvature={-30}
        gradientStartColor="#10b981"
        gradientStopColor="#22c55e"
        duration={3}
        delay={3.2}
      />
    </div>
  );
}

const projects = [
  {
    title: "Whatsapp-Team",
    subtitle: "Multi-LLM Orchestration System",
    description:
      "WhatsApp Business Admin Panel with AI-powered knowledge assistant. Uses intent-based routing to Claude Haiku, RAG with pgvector, and GPT-4o-mini for response generation.",
    features: [
      "3 LLM providers (Anthropic, OpenAI, Voyage)",
      "Intent-based routing for cost efficiency",
      "RAG with pgvector for knowledge retrieval",
      "Real-time streaming responses",
    ],
    diagram: <WhatsappTeamDiagram />,
  },
  {
    title: "VC-Hunter",
    subtitle: "AI Agent Pipeline",
    description:
      "AI-powered VC research & outreach automation. Uses 4 specialized agents running on Claude Haiku with JSON output mode for structured data extraction.",
    features: [
      "4 specialized AI agents",
      "Claude Haiku for all agents (cost-efficient)",
      "JSON output mode for structured data",
      "Full pipeline: discovery → outreach",
    ],
    diagram: <VCHunterDiagram />,
  },
];

const AIProjectsSection = forwardRef<HTMLElement>((props, ref) => {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Create matchMedia for responsive behavior
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const container = containerRef.current;
        const header = headerRef.current;
        const slider = sliderRef.current;
        const projectsWrapper = slider?.parentElement;

        if (!container || !header || !slider || !projectsWrapper) return;

        // Set initial state - projects layer hidden
        gsap.set(projectsWrapper, { opacity: 0 });

        // Calculate the scroll distance for horizontal scroll
        const scrollWidth = slider.scrollWidth - window.innerWidth;

        // DRAMATIC ZOOM-THROUGH EFFECT
        // - Header zooms so large (8x) that all text flies off screen
        // - Extended scroll distance (3x viewport) for cinematic feel
        const headerAnimScrollDistance = window.innerHeight * 3;
        const totalScrollDistance = headerAnimScrollDistance + scrollWidth;

        // Create timeline with ScrollTrigger
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: () => `+=${totalScrollDistance}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            refreshPriority: 1,
          },
        });

        // Normalized durations (relative to total timeline)
        const headerPhaseDuration = headerAnimScrollDistance / totalScrollDistance;
        const scrollPhaseDuration = scrollWidth / totalScrollDistance;

        // ============================================
        // HEADER ZOOM-THROUGH ANIMATION
        // Scale: 1 → 8 (text flies off screen)
        // ============================================

        // Phase 1: Slow start zoom (0% - 20%)
        // Building anticipation with subtle movement
        tl.to(
          header,
          {
            scale: 1.3,
            duration: headerPhaseDuration * 0.2,
            ease: "power1.in",
            force3D: true,
          },
          0
        );

        // Phase 2: Accelerating zoom (20% - 50%)
        // Text starts flying towards viewer
        tl.to(
          header,
          {
            scale: 3,
            duration: headerPhaseDuration * 0.3,
            ease: "power2.in",
            force3D: true,
          },
          headerPhaseDuration * 0.2
        );

        // Phase 3: Maximum zoom + fade (50% - 80%)
        // Text zooms past screen, fades out, projects reveal
        tl.to(
          header,
          {
            scale: 8,
            opacity: 0,
            duration: headerPhaseDuration * 0.3,
            ease: "power2.inOut",
            force3D: true,
          },
          headerPhaseDuration * 0.5
        );

        // Projects fade in (50% - 80%)
        // Revealed as header zooms past
        tl.fromTo(
          projectsWrapper,
          { opacity: 0 },
          {
            opacity: 1,
            duration: headerPhaseDuration * 0.3,
            ease: "power2.out",
          },
          headerPhaseDuration * 0.5
        );

        // Phase 4: Settle (80% - 100%)
        // Projects fully visible, ready for horizontal scroll

        // ============================================
        // HORIZONTAL SCROLL PHASE (after header phase)
        // ============================================
        tl.to(
          slider,
          {
            x: -scrollWidth,
            duration: scrollPhaseDuration,
            ease: "none",
            force3D: true,
          },
          headerPhaseDuration
        );

        // Return cleanup function for matchMedia
        return () => {
          tl.kill();
        };
      });

      // Cleanup matchMedia on component unmount
      return () => {
        mm.revert();
      };
    },
    { scope: containerRef, dependencies: [] }
  );

  return (
    <>
      {/* Desktop: Two-Stage Animation */}
      <section
        ref={(node) => {
          containerRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        className="hidden md:block relative h-screen w-full overflow-hidden"
        style={{ backgroundColor: "hsl(var(--background))" }}
      >
        {/* Projects Layer (behind) - z-index: 0 */}
        <div className="absolute inset-0 z-0">
          <div
            ref={sliderRef}
            className="flex h-full will-change-transform"
            style={{ width: `${projects.length * 100}vw` }}
          >
            {/* Project Panels */}
            {projects.map((project, index) => (
              <div
                key={index}
                className="project-card flex-shrink-0 w-screen h-full flex items-center justify-center px-8 lg:px-16"
              >
                <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
                  {/* Diagram */}
                  <div className={index % 2 === 0 ? "order-1" : "order-1 lg:order-2"}>
                    {project.diagram}
                  </div>

                  {/* Info */}
                  <div className={`space-y-6 ${index % 2 === 0 ? "order-2" : "order-2 lg:order-1"}`}>
                    <div>
                      <h3 className="text-3xl md:text-4xl font-bold">{project.title}</h3>
                      <p className="text-primary font-medium text-xl mt-2">{project.subtitle}</p>
                    </div>

                    <p className="text-muted-foreground text-lg">{project.description}</p>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-lg">Key Features:</h4>
                      <ul className="space-y-3">
                        {project.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-3">
                            <div className="size-2.5 rounded-full bg-primary flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                        </span>
                        <span className="text-sm font-medium text-green-600 dark:text-green-400">
                          In Production
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Header Layer (on top) - z-index: 10 */}
        <div
          ref={headerRef}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center will-change-transform"
          style={{ backgroundColor: "hsl(var(--background))" }}
        >
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            Production AI
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6 text-center">
            AI Projects I&apos;ve Built
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl text-center">
            Real AI systems I&apos;ve built for clients.
          </p>
        </div>
      </section>

      {/* Mobile: Vertical Layout */}
      <section className="md:hidden py-16 px-4 bg-background">
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            Production AI
          </span>
          <h2 className="text-2xl font-bold mt-2 mb-4">
            AI Projects I&apos;ve Built
          </h2>
          <p className="text-muted-foreground text-sm">
            Real AI systems I&apos;ve built for clients.
          </p>
        </div>

        <div className="space-y-16">
          {projects.map((project, index) => (
            <div key={index} className="space-y-6">
              <div>
                <h3 className="text-xl font-bold">{project.title}</h3>
                <p className="text-primary font-medium">{project.subtitle}</p>
              </div>

              {project.diagram}

              <p className="text-sm text-muted-foreground">{project.description}</p>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Key Features:</h4>
                <ul className="space-y-1.5">
                  {project.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <div className="size-1.5 rounded-full bg-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-xs font-medium text-green-600 dark:text-green-400">
                  In Production
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
});

AIProjectsSection.displayName = "AIProjectsSection";

export default AIProjectsSection;
