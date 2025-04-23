import { ArrowRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import siteData from "@/constants/siteData.json";

export default function ServicesSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Services I Offer</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive solutions tailored to your specific needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Primary Services</h3>
              <ul className="space-y-2">
                {siteData.services.primary.map((service, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-primary" />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">
                Additional Services
              </h3>
              <ul className="space-y-2">
                {siteData.services.network.map((service, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-primary" />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
