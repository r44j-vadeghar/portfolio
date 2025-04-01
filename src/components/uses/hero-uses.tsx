"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import siteData from "@/constants/siteData.json";
import { AnimatePresence, motion } from "framer-motion";
import { Star } from "lucide-react";
import { useState } from "react";

export default function HeroUses() {
  const { categories } = siteData.pages.uses;
  const [activeCategory, setActiveCategory] = useState(categories[0].name);
  const currentCategory =
    categories.find((cat) => cat.name === activeCategory) || categories[0];

  function hasAffiliateLink(
    obj:
      | string
      | {
          name: string;
          affiliateLink: string;
          rating: string;
          recommended: boolean;
          ratedOn: string;
          image: string;
        }
      | {
          name: string;
        }
  ) {
    return typeof obj === "object" && obj !== null && "affiliateLink" in obj;
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-wrap gap-3 justify-center">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => setActiveCategory(category.name)}
            className={`
              relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
              ${
                activeCategory === category.name
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary/40 text-secondary-foreground hover:bg-secondary/60"
              }
            `}
          >
            {category.title}
          </button>
        ))}
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-semibold">{currentCategory.title}</h2>
        <p className="text-muted-foreground mt-2">
          Tools and products I personally use and recommend
        </p>
        <div className="mt-3 h-1 w-20 bg-primary mx-auto rounded-full"></div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid gap-6 md:grid-cols-2"
        >
          {currentCategory.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { delay: index * 0.1 },
              }}
            >
              <Card className="h-full border-border bg-card hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-6">
                    {item.list.map((listItem, listIndex) => (
                      <li key={listIndex} className="group">
                        {!hasAffiliateLink(listItem) ? (
                          <div className="flex items-start h-fit">
                            <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-2"></div>
                            <span className="text-card-foreground">
                              {typeof listItem === "string"
                                ? listItem
                                : listItem.name}
                            </span>
                          </div>
                        ) : (
                          <a
                            href={listItem.affiliateLink}
                            className="rounded-lg p-4 hover:border-primary hover:shadow-md transition-all duration-300"
                          >
                            {listItem.image && (
                              <div className="aspect-video w-full overflow-hidden rounded-md mb-4">
                                <img
                                  src={listItem.image}
                                  alt={listItem.name}
                                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                />
                              </div>
                            )}

                            <div className="flex justify-between items-start">
                              <div className="space-y-2">
                                <h3 className="font-medium text-lg">
                                  {listItem.name}
                                </h3>

                                {/* Star Rating */}
                                {listItem.rating && (
                                  <div className="flex items-center">
                                    {Array(5)
                                      .fill(0)
                                      .map((_, i) => (
                                        <Star
                                          key={i}
                                          size={16}
                                          className={`${
                                            i <
                                            Math.floor(
                                              parseFloat(listItem.rating)
                                            )
                                              ? "text-yellow-400 fill-yellow-400"
                                              : "text-gray-300"
                                          }`}
                                        />
                                      ))}
                                    <span className="ml-2 text-sm text-muted-foreground">
                                      {listItem.rating}/5
                                    </span>
                                  </div>
                                )}

                                {/* Last Updated */}
                                {listItem.ratedOn && (
                                  <p className="text-xs text-muted-foreground">
                                    Reviewed on {listItem.ratedOn}
                                  </p>
                                )}
                              </div>

                              {/* Recommendation Badge */}
                              {listItem.recommended && (
                                <Badge className="bg-green-600 hover:bg-green-700">
                                  Recommended
                                </Badge>
                              )}
                            </div>

                            {/* Call to Action */}
                            <button className="mt-4 block w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 px-4 rounded-md text-center transition-colors duration-200">
                              View on Amazon
                            </button>
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
