"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import siteData from "@/constants/siteData.json";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function HeroUses() {
  const { categories } = siteData.pages.uses;
  const [activeCategory, setActiveCategory] = useState(categories[0].name);
  const currentCategory =
    categories.find((cat) => cat.name === activeCategory) || categories[0];

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
                  <ul className="space-y-3">
                    {item.list.map((listItem, listIndex) => (
                      <li key={listIndex} className="flex items-start">
                        <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-card-foreground leading-relaxed">
                          {listItem}
                        </span>
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
