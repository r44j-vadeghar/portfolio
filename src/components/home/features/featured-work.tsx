import siteData from "@/constants/siteData.json";
import { Badge } from "../../ui/badge";
import { ManifoldVentures, RjYoutube, TCS } from "./featured-card";
import FeaturedContent from "./featured-content";

const featuredWork = [
  {
    id: "r44j-startup",
    title: "Startup Experience",
    description:
      "Led development of multiple digital products at Manifold Ventures, focusing on React/Next.js applications",
    card: ManifoldVentures,
    image: "/assets/featured/startup-work.png",
    tags: ["React", "Next.js", "TypeScript", "Chrome Extensions"],
  },
  {
    id: "r44j-tcs",
    title: "Enterprise Solutions at TCS",
    description:
      "Implemented DevOps practices and .NET/C# solutions that improved system reliability and deployment efficiency",
    card: TCS,
    image: "/assets/featured/tcs-work.jpeg",
    tags: ["DevOps", ".NET", "C#", "Enterprise"],
  },
  {
    id: "r44j-youtube",
    title: "YouTube Content Creation",
    description:
      "Created educational content for developers, sharing knowledge and best practices",
    card: RjYoutube,
    image: "/assets/featured/youtube-content.png",
    tags: ["Video Editing", "SEO", "Content Creation"],
  },
];

function FeaturedWork() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 hidden sm:block">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            {siteData.home.featuredWork.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {siteData.home.featuredWork.description}
          </p>
        </div>

        <div className="flex w-full gap-20 items-start">
          <div className="w-full">
            <ul>
              {featuredWork.map((item) => (
                <li key={item.id}>
                  <FeaturedContent id={item.id}>
                    <p className="font-heading text-5xl">{item.title}</p>

                    <p className="text-muted-foreground mb-4">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, tagIndex) => (
                        <Badge
                          key={tagIndex}
                          variant="secondary"
                          className="font-normal"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </FeaturedContent>
                </li>
              ))}
            </ul>
          </div>
          <div className="sticky top-0 flex h-screen w-full items-center">
            <div className="relative aspect-square w-full rounded-2xl transition-[height] h-0 [&:has(>_.active-card)]:h-auto [&:has(>_.active-card)]:bg-transparent">
              {featuredWork.map((item) => (
                <item.card id={item.id} key={item.title} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedWork;
