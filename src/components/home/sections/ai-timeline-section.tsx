"use client";

import { AnimatedBeam } from "@/components/ui/animated-beam";
import { cn } from "@/lib/utils";
import { Bot, Cpu, Database, MessageSquare, Rocket, Sparkles, Zap } from "lucide-react";
import { forwardRef, useRef } from "react";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  skills: string[];
}

const timeline: TimelineItem[] = [
  {
    year: "Apr 2025",
    title: "Whatsapp-Team",
    description: "Started building WhatsApp Business Admin Panel",
    icon: MessageSquare,
    color: "text-green-500",
    skills: ["Next.js", "TypeScript", "PostgreSQL"],
  },
  {
    year: "Sep 2025",
    title: "VC-Hunter AI Agents",
    description: "4 specialized agents for VC research & outreach",
    icon: Bot,
    color: "text-purple-500",
    skills: ["AI Agents", "Claude Haiku", "JSON output"],
  },
  {
    year: "Oct 2025",
    title: "First RAG System",
    description: "Implemented RAG with AI settings & auto-reply",
    icon: Database,
    color: "text-blue-500",
    skills: ["RAG", "Vector search", "pgvector"],
  },
  {
    year: "Nov 2025",
    title: "Multi-LLM Integration",
    description: "Integrated OpenAI, Claude & Voyage AI",
    icon: Cpu,
    color: "text-pink-500",
    skills: ["LLM orchestration", "Embeddings", "Cost optimization"],
  },
  {
    year: "Dec 2025",
    title: "Production AI Systems",
    description: "Knowledge base, intent routing, web search",
    icon: Sparkles,
    color: "text-amber-500",
    skills: ["Intent detection", "Streaming", "Production AI"],
  },
];

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-14 items-center justify-center rounded-full border-2 bg-background shadow-lg",
        className
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

function TimelineBeams() {
  const containerRef = useRef<HTMLDivElement>(null);
  const startRef = useRef<HTMLDivElement>(null);
  const node1Ref = useRef<HTMLDivElement>(null);
  const node2Ref = useRef<HTMLDivElement>(null);
  const node3Ref = useRef<HTMLDivElement>(null);
  const node4Ref = useRef<HTMLDivElement>(null);
  const node5Ref = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const nodeRefs = [node1Ref, node2Ref, node3Ref, node4Ref, node5Ref];

  return (
    <div
      ref={containerRef}
      className="relative hidden lg:flex w-full max-w-6xl mx-auto items-center justify-between py-8"
    >
      {/* Start Node */}
      <Circle ref={startRef} className="border-muted-foreground/30">
        <Zap className="size-6 text-muted-foreground" />
      </Circle>

      {/* Timeline Nodes */}
      {timeline.map((item, index) => (
        <Circle
          key={item.year}
          ref={nodeRefs[index]}
          className={cn("border-current", item.color)}
        >
          <item.icon className={cn("size-6", item.color)} />
        </Circle>
      ))}

      {/* End Node */}
      <Circle ref={endRef} className="border-green-500">
        <Rocket className="size-6 text-green-500" />
      </Circle>

      {/* Beams */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={startRef}
        toRef={node1Ref}
        gradientStartColor="#6b7280"
        gradientStopColor="#22c55e"
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={node1Ref}
        toRef={node2Ref}
        gradientStartColor="#22c55e"
        gradientStopColor="#9333ea"
        duration={3}
        delay={0.4}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={node2Ref}
        toRef={node3Ref}
        gradientStartColor="#9333ea"
        gradientStopColor="#3b82f6"
        duration={3}
        delay={0.8}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={node3Ref}
        toRef={node4Ref}
        gradientStartColor="#3b82f6"
        gradientStopColor="#ec4899"
        duration={3}
        delay={1.2}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={node4Ref}
        toRef={node5Ref}
        gradientStartColor="#ec4899"
        gradientStopColor="#f59e0b"
        duration={3}
        delay={1.6}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={node5Ref}
        toRef={endRef}
        gradientStartColor="#f59e0b"
        gradientStopColor="#22c55e"
        duration={3}
        delay={2}
      />
    </div>
  );
}

const AITimelineSection = forwardRef<HTMLElement>((props, ref) => {
  return (
    <section ref={ref} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            2025 Journey
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            My AI Development Timeline
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From building full-stack apps to implementing production AI systems
            with multi-LLM orchestration — all in 2025.
          </p>
        </div>

        {/* Desktop Timeline with Beams */}
        <TimelineBeams />

        {/* Timeline Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mt-8">
          {timeline.map((item, index) => (
            <div
              key={item.year}
              className="group relative rounded-xl border bg-card p-6 transition-all hover:shadow-lg hover:border-primary/30"
            >
              {/* Year Badge */}
              <div
                className={cn(
                  "absolute -top-3 left-6 px-3 py-1 rounded-full text-xs font-bold bg-background border",
                  item.color
                )}
              >
                {item.year}
              </div>

              <div className="mt-3">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={cn(
                      "p-2 rounded-lg bg-current/10",
                      item.color.replace("text-", "bg-").replace("500", "500/10")
                    )}
                  >
                    <item.icon className={cn("size-5", item.color)} />
                  </div>
                  <h3 className="font-semibold">{item.title}</h3>
                </div>

                <p className="text-sm text-muted-foreground mb-4">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-2 py-1 rounded-md bg-muted"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Connection line for mobile */}
              {index < timeline.length - 1 && (
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-px h-6 bg-gradient-to-b from-border to-transparent md:hidden" />
              )}
            </div>
          ))}
        </div>

        {/* Current Status */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-green-500/10 border border-green-500/20">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-green-600 dark:text-green-400">
              Currently: Building AI-powered products for clients
            </span>
          </div>
        </div>
      </div>
    </section>
  );
});

AITimelineSection.displayName = "AITimelineSection";

export default AITimelineSection;
