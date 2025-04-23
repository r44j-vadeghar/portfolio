import { Code, Database, Paintbrush, Server, Video } from "lucide-react";
import { forwardRef } from "react";

import { Card, CardContent } from "@/components/ui/card";
import siteData from "@/constants/siteData.json";

const iconMap = {
  Code: Code,
  Database: Database,
  Server: Server,
  Paintbrush: Paintbrush,
  Video: Video,
};

const SkillsSection = forwardRef<HTMLElement>((props, ref) => {
  const renderIcon = (iconName: keyof typeof iconMap) => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent className="h-5 w-5" /> : null;
  };

  return (
    <section ref={ref} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">My Expertise</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Specialized skills honed over 3 years of professional experience
            across startup and enterprise environments.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteData.home.skills.map((skill, index) => (
            <Card
              key={index}
              className="skill-card overflow-hidden border border-border/50 bg-card/50 backdrop-blur-sm"
            >
              <CardContent className="p-6">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${skill.color}-500/10 mb-4`}
                >
                  {renderIcon(skill.iconName as keyof typeof iconMap)}
                </div>
                <h3 className="text-xl font-semibold mb-2">{skill.label}</h3>
                <p className="text-muted-foreground">
                  {
                    siteData.about.skills.find((s) => s.label === skill.label)
                      ?.description
                  }
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
});

SkillsSection.displayName = "SkillsSection";

export default SkillsSection;
