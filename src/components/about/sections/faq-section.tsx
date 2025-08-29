"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { forwardRef } from "react";

const FaqSection = forwardRef<HTMLElement>((_, ref) => {
  const faqs = [
    {
      question: "What makes you different from other developers?",
      answer: "I deliver 40% faster using AI-enhanced workflows while maintaining enterprise-grade quality. My optimization-focused approach means better performance, cleaner code, and fewer post-launch issues."
    },
    {
      question: "What types of projects are you best at?",
      answer: "Complex full-stack applications, Chrome extensions, WhatsApp Business integrations, and real-time systems. If it involves modern tech stacks, AI integration, or scalable architecture - that's my specialty."
    },
    {
      question: "How long do projects typically take?",
      answer: "Chrome extensions: 3-4 weeks. Full-stack applications: 6-8 weeks. Complex platforms with AI: 8-12 weeks. My AI-enhanced process delivers results significantly faster than traditional development."
    },
    {
      question: "Do you work with existing teams?",
      answer: "Yes, I integrate seamlessly with existing teams and can work with legacy codebases. I also provide technical leadership and can mentor junior developers when needed."
    },
    {
      question: "What's included in your service?",
      answer: "Complete project lifecycle: planning, development, testing, deployment, documentation, and 30-day post-launch support. You get everything needed to run and scale your solution."
    },
    {
      question: "How do you ensure quality?",
      answer: "Automated testing, AI-assisted code reviews, performance monitoring, and comprehensive QA processes. Every project includes TypeScript setup, CI/CD pipelines, and security audits."
    }
  ];

  return (
    <section ref={ref} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Questions & Answers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about working with me and what makes our collaboration successful.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-6">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`} 
              className="faq-item border border-border/30 bg-card/80 backdrop-blur-sm rounded-xl px-8 py-2 shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/20"
            >
              <AccordionTrigger className="text-left hover:no-underline py-6 text-lg">
                <span className="font-semibold text-foreground pr-4">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6 leading-relaxed text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
});

FaqSection.displayName = "FaqSection";

export default FaqSection;