"use client";

import { AnimatedBeam } from "@/components/ui/animated-beam";
import { cn } from "@/lib/utils";
import {
  Bot,
  Code2,
  FileSearch,
  Lightbulb,
  Rocket,
  TestTube,
  Workflow,
} from "lucide-react";
import { forwardRef, useRef } from "react";

interface WorkflowStep {
  icon: React.ElementType;
  title: string;
  description: string;
  aiTool: string;
  color: string;
}

const workflowSteps: WorkflowStep[] = [
  {
    icon: FileSearch,
    title: "Research",
    description: "Understand requirements and explore solutions",
    aiTool: "Context7 + Claude",
    color: "text-blue-500",
  },
  {
    icon: Lightbulb,
    title: "Design",
    description: "Architecture and system design",
    aiTool: "Claude Brainstorm",
    color: "text-purple-500",
  },
  {
    icon: Code2,
    title: "Build",
    description: "Write code with AI assistance",
    aiTool: "Claude Code",
    color: "text-pink-500",
  },
  {
    icon: TestTube,
    title: "Test",
    description: "Verify functionality and fix issues",
    aiTool: "AI-Generated Tests",
    color: "text-amber-500",
  },
  {
    icon: Rocket,
    title: "Deploy",
    description: "Ship to production with confidence",
    aiTool: "GitHub Actions + VPS",
    color: "text-green-500",
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
        "z-10 flex size-16 items-center justify-center rounded-full border-2 bg-background shadow-lg",
        className
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

function WorkflowDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);
  const step4Ref = useRef<HTMLDivElement>(null);
  const step5Ref = useRef<HTMLDivElement>(null);

  const refs = [step1Ref, step2Ref, step3Ref, step4Ref, step5Ref];

  return (
    <div
      ref={containerRef}
      className="relative flex flex-wrap md:flex-nowrap justify-center md:justify-between items-center gap-8 md:gap-4 py-12"
    >
      {workflowSteps.map((step, index) => (
        <div key={step.title} className="flex flex-col items-center gap-3">
          <Circle
            ref={refs[index]}
            className={cn("border-current transition-transform hover:scale-110", step.color)}
          >
            <step.icon className={cn("size-7", step.color)} />
          </Circle>
          <div className="text-center">
            <p className="font-semibold text-sm">{step.title}</p>
            <p className="text-xs text-muted-foreground">{step.aiTool}</p>
          </div>
        </div>
      ))}

      {/* Beams connecting steps */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={step1Ref}
        toRef={step2Ref}
        gradientStartColor="#3b82f6"
        gradientStopColor="#9333ea"
        duration={2.5}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={step2Ref}
        toRef={step3Ref}
        gradientStartColor="#9333ea"
        gradientStopColor="#ec4899"
        duration={2.5}
        delay={0.5}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={step3Ref}
        toRef={step4Ref}
        gradientStartColor="#ec4899"
        gradientStopColor="#f59e0b"
        duration={2.5}
        delay={1}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={step4Ref}
        toRef={step5Ref}
        gradientStartColor="#f59e0b"
        gradientStopColor="#22c55e"
        duration={2.5}
        delay={1.5}
      />
    </div>
  );
}

const WorkflowSection = forwardRef<HTMLElement>((props, ref) => {
  return (
    <section ref={ref} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            My Process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            AI-Augmented Workflow
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            How I leverage AI at every step of the development process to deliver
            faster and better results.
          </p>
        </div>

        {/* Workflow Diagram */}
        <div className="mb-16 hidden md:block">
          <WorkflowDiagram />
        </div>

        {/* Workflow Cards */}
        <div className="grid md:grid-cols-5 gap-4">
          {workflowSteps.map((step, index) => (
            <div
              key={step.title}
              className="group relative rounded-xl border bg-card p-5 transition-all hover:shadow-lg hover:border-primary/30"
            >
              {/* Step Number */}
              <div className="absolute -top-3 -right-3 size-8 rounded-full bg-background border-2 flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>

              <div
                className={cn(
                  "p-3 rounded-lg inline-block mb-3",
                  step.color.replace("text-", "bg-").replace("500", "500/10")
                )}
              >
                <step.icon className={cn("size-6", step.color)} />
              </div>

              <h3 className="font-semibold mb-1">{step.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">
                {step.description}
              </p>

              <div className="flex items-center gap-2 text-xs">
                <Bot className="size-3 text-primary" />
                <span className="text-primary font-medium">{step.aiTool}</span>
              </div>

              {/* Connection Arrow (mobile) */}
              {index < workflowSteps.length - 1 && (
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 md:hidden">
                  <Workflow className="size-4 text-muted-foreground rotate-90" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* AI Tools Used */}
        <div className="mt-16 p-6 rounded-xl bg-muted/50 border">
          <h3 className="font-semibold mb-4 text-center">
            AI Tools in My Daily Workflow
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Claude Code",
              "Claude API",
              "GPT-4",
              "Context7 MCP",
              "Voyage AI",
              "Anthropic SDK",
              "LangChain",
              "pgvector",
            ].map((tool) => (
              <span
                key={tool}
                className="px-4 py-2 rounded-full bg-background border text-sm font-medium hover:border-primary/50 transition-colors"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

WorkflowSection.displayName = "WorkflowSection";

export default WorkflowSection;
