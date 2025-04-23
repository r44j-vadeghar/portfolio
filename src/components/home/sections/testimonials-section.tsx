import Image from "next/image";
import Link from "next/link";
import { forwardRef } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import siteData from "@/constants/siteData.json";

const TestimonialSection = forwardRef<HTMLElement>((props, ref) => {
  return (
    <section ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Client Testimonial</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            What clients say about working with me
          </p>
        </div>

        {siteData.home.testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial max-w-3xl mx-auto">
            <Card className="border border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="flex-shrink-0">
                    <Link
                      href={testimonial.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        src={
                          testimonial.logoPath ||
                          `/placeholder.svg?height=80&width=80`
                        }
                        alt={testimonial.company}
                        width={80}
                        height={80}
                        className="rounded-lg"
                      />
                    </Link>
                  </div>
                  <div className="flex-1">
                    <blockquote
                      className="text-lg italic mb-4"
                      dangerouslySetInnerHTML={{
                        __html: testimonial.testimonial,
                      }}
                    />
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src="/placeholder-user.jpg"
                          alt={testimonial.person}
                        />
                        <AvatarFallback>
                          {testimonial.person.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{testimonial.person}</p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.position}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
});

TestimonialSection.displayName = "TestimonialSection";

export default TestimonialSection;
