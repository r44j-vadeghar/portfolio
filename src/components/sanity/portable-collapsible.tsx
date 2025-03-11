"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PortableText } from "@portabletext/react";
import { BlockContent } from "../../../sanity.types";

export default function PortableCollapsible({
  value,
}: {
  value: {
    title: string;
    content: BlockContent;
    defaultOpen?: boolean;
  };
}) {
  const { title, content, defaultOpen = false } = value;

  return (
    <Accordion
      type="single"
      defaultValue={defaultOpen ? "content" : undefined}
      className="my-6 w-full"
    >
      <AccordionItem value="content">
        <AccordionTrigger>{title}</AccordionTrigger>
        <AccordionContent>
          <PortableText value={content} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
