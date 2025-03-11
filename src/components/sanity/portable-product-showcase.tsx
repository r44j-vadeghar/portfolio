"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { imageUrl } from "@/lib/imageUrl";
import { cn } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import {
  ArrowRight,
  BarChart,
  CheckCircle,
  Clock,
  Download,
  ExternalLink,
  ShoppingCart,
  Sparkles,
  Star,
  Tag,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  BlockContent,
  internalGroqTypeReferenceTo,
} from "../../../sanity.types";

interface ProductShowcaseProps {
  product: {
    _id: string;
    name: string;
    slug: { current: string };
    image?: { asset: { _ref: string } };
    description?: BlockContent;
    price: number;
    productCategories?: Array<{ name: string; _id: string }>;
    stock?: number;
  };
  style?: "compact" | "full" | "featured";
  customCta?: string;
  showPrice?: boolean;
}

export default function PremiumProductShowcase({
  product,
  style = "compact",
  customCta,
  showPrice = true,
}: ProductShowcaseProps) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const formattedPrice = useMemo(() => {
    if (typeof product.price !== "number" || isNaN(product.price)) {
      return "Price unavailable";
    }
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(product.price);
  }, [product.price]);

  const ctaText = customCta || "View Product";

  if (!product || !product.name) {
    return (
      <Card className="my-6 p-4 border border-border/50 bg-background/80 shadow-sm">
        <CardContent>
          <p className="text-muted-foreground text-center py-4">
            Product data unavailable
          </p>
        </CardContent>
      </Card>
    );
  }

  const handleViewProduct = () => {
    if (product?.slug?.current) {
      router.push(`/product/${product.slug.current}`);
    }
  };

  const descriptionComponents = {
    block: {
      normal: ({ children }: { children: React.ReactNode }) => (
        <p className="text-muted-foreground leading-relaxed">{children}</p>
      ),
    },
  };

  const cleanedStyle = style.replace(/[\u200B-\u200D\uFEFF]/g, "");

  if (cleanedStyle === "compact") {
    return (
      <Card
        className={cn(
          "my-6 overflow-hidden group cursor-pointer transition-all duration-300",
          "border border-border/50 bg-gradient-to-b from-background to-background/90",
          "hover:border-primary/30 rounded-lg",
          "hover:shadow-lg hover:shadow-primary/10 relative",
          isHovered ? "translate-y-[-2px]" : ""
        )}
        onClick={handleViewProduct}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Premium glow effect */}
        <div
          className={cn(
            "absolute inset-0 opacity-0 transition-opacity duration-700 pointer-events-none",
            isHovered ? "opacity-100" : ""
          )}
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 via-primary/10 to-secondary/20 rounded-lg blur-sm" />
        </div>

        <div className="flex items-center relative">
          {product.image ? (
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 overflow-hidden">
              <div
                className={cn(
                  "absolute inset-0 transition-transform duration-500 ease-out",
                  isHovered ? "scale-110" : "scale-100"
                )}
              >
                <Image
                  src={imageUrl(product.image)?.url() || ""}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 96px, 128px"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent" />
            </div>
          ) : (
            <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 bg-gradient-to-br from-muted/40 to-muted/10 flex items-center justify-center">
              <Tag size={24} className="text-primary/40" />
            </div>
          )}
          <div className="p-4 flex-grow">
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="text-base sm:text-lg font-semibold leading-tight">
                {product.name}
              </CardTitle>
              {showPrice && (
                <Badge
                  variant="outline"
                  className={cn(
                    "ml-auto font-medium transition-all duration-300",
                    isHovered
                      ? "bg-primary/10 text-primary border-primary/30 shadow-sm shadow-primary/5"
                      : ""
                  )}
                >
                  {formattedPrice}
                </Badge>
              )}
            </div>
            {product.productCategories &&
              product.productCategories.length > 0 && (
                <div className="flex mt-2 gap-1.5 flex-wrap">
                  {product.productCategories.slice(0, 3).map((category) => (
                    <Badge
                      key={category._id}
                      variant="secondary"
                      className="text-xs px-2 py-0 h-5 bg-secondary/40 hover:bg-secondary/60"
                    >
                      {category.name}
                    </Badge>
                  ))}
                  {product.productCategories.length > 3 && (
                    <span className="text-xs text-muted-foreground">
                      +{product.productCategories.length - 3} more
                    </span>
                  )}
                </div>
              )}
            <div
              className={cn(
                "flex items-center space-x-4 text-sm text-muted-foreground mt-2 transition-opacity",
                isHovered ? "opacity-100" : "opacity-60"
              )}
            >
              <span className="flex items-center">
                <Download size={14} className="mr-1" />
                Instant
              </span>
              <span className="flex items-center">
                <CheckCircle size={14} className="mr-1" />
                Support
              </span>
            </div>
          </div>
          <div
            className={cn(
              "pr-4 transition-all duration-300 text-primary",
              isHovered
                ? "translate-x-0 opacity-100"
                : "translate-x-4 opacity-0"
            )}
          >
            <ArrowRight size={18} className="stroke-2" />
          </div>
        </div>
      </Card>
    );
  }

  if (cleanedStyle === "full") {
    return (
      <Card
        className={cn(
          "my-6 overflow-hidden transition-all duration-500",
          "border border-border/50 rounded-lg",
          "hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10",
          "bg-gradient-to-br from-background via-background to-background/95 relative",
          isHovered ? "translate-y-[-3px]" : ""
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Premium glow effect */}
        <div
          className={cn(
            "absolute inset-0 opacity-0 transition-opacity duration-700 pointer-events-none",
            isHovered ? "opacity-100" : ""
          )}
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 via-primary/5 to-secondary/20 rounded-lg blur-md" />
        </div>

        <div className="flex flex-col md:flex-row">
          {product.image ? (
            <div className="relative w-full md:w-2/5 h-64 md:h-auto overflow-hidden">
              <div
                className={cn(
                  "absolute inset-0 transition-transform duration-700 ease-out",
                  isHovered ? "scale-105" : "scale-100"
                )}
              >
                <Image
                  src={imageUrl(product.image)?.url() || ""}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  priority
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-background/90 via-background/50 to-transparent" />
              {product.stock !== undefined &&
                product.stock <= 10 &&
                product.stock > 0 && (
                  <div className="absolute top-4 left-4">
                    <Badge
                      variant="secondary"
                      className="bg-background/90 backdrop-blur-sm text-xs shadow-md"
                    >
                      Only {product.stock} left
                    </Badge>
                  </div>
                )}
              {product.stock === 0 && (
                <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px] flex items-center justify-center">
                  <Badge
                    variant="destructive"
                    className="text-sm px-3 py-1.5 uppercase font-semibold tracking-wide shadow-lg"
                  >
                    Sold Out
                  </Badge>
                </div>
              )}
            </div>
          ) : (
            <div className="w-full md:w-2/5 h-64 md:h-auto bg-gradient-to-br from-muted/30 to-muted/10 flex items-center justify-center">
              <Tag size={48} className="text-primary/30" />
            </div>
          )}
          <div className="flex flex-col flex-grow relative">
            {/* Social proof indicators */}
            <div
              className={cn(
                "absolute top-4 right-4 flex items-center space-x-2 transition-opacity duration-300",
                isHovered ? "opacity-100" : "opacity-70"
              )}
            >
              <div className="flex -space-x-1">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary border border-primary/30">
                  <Users size={12} />
                </div>
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary border border-primary/30">
                  <BarChart size={12} />
                </div>
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary border border-primary/30">
                  <Clock size={12} />
                </div>
              </div>
              <span className="text-xs text-muted-foreground">
                Used by 200+
              </span>
            </div>

            <CardHeader>
              <div className="flex justify-between items-start gap-4">
                <div>
                  <CardTitle className="text-xl font-semibold">
                    {product.name}
                  </CardTitle>
                  {product.productCategories &&
                    product.productCategories.length > 0 && (
                      <div className="flex mt-2 gap-1.5 flex-wrap">
                        {product.productCategories.map((category) => (
                          <Badge
                            key={category._id}
                            variant="secondary"
                            className="text-xs bg-secondary/40 hover:bg-secondary/60"
                          >
                            {category.name}
                          </Badge>
                        ))}
                      </div>
                    )}
                </div>
                {showPrice && (
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-lg px-3 py-1.5 font-medium transition-all duration-300 whitespace-nowrap",
                      isHovered
                        ? "bg-primary/10 text-primary border-primary/30 shadow-sm shadow-primary/10"
                        : ""
                    )}
                  >
                    {formattedPrice}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {product.description && (
                <div className="line-clamp-3 text-muted-foreground">
                  <PortableText
                    value={product.description}
                    // @ts-ignore
                    components={descriptionComponents}
                  />
                </div>
              )}

              <div
                className={cn(
                  "grid grid-cols-2 gap-4 mt-6 transition-opacity duration-300",
                  isHovered ? "opacity-100" : "opacity-80"
                )}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Download size={16} />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Instant Access</div>
                    <div className="text-xs text-muted-foreground">
                      Download immediately
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <CheckCircle size={16} />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Lifetime Updates</div>
                    <div className="text-xs text-muted-foreground">
                      Free updates included
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center mt-auto pt-4 border-t border-border/30">
              <div className="flex items-center space-x-1 text-amber-400">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} className="text-amber-400/30" />
                <span className="ml-1 text-sm text-muted-foreground">4.0</span>
              </div>
              <Button
                onClick={handleViewProduct}
                className={cn(
                  "ml-auto transition-all duration-300 bg-gradient-to-r from-primary to-primary/90",
                  isButtonHovered
                    ? "shadow-lg shadow-primary/15 translate-y-[-1px]"
                    : ""
                )}
                onMouseEnter={() => setIsButtonHovered(true)}
                onMouseLeave={() => setIsButtonHovered(false)}
                disabled={product.stock === 0}
              >
                <ShoppingCart size={16} className="mr-2" />
                {ctaText}
              </Button>
            </CardFooter>
          </div>
        </div>
      </Card>
    );
  }

  // Featured layout
  return (
    <Card
      className={cn(
        "my-8 overflow-hidden transition-all duration-500 relative",
        "border border-primary/30 rounded-xl",
        "hover:shadow-2xl hover:shadow-primary/15 bg-gradient-to-br from-background to-accent/10",
        isHovered ? "translate-y-[-4px]" : ""
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Premium glow effect */}
      <div
        className={cn(
          "absolute -inset-0.5 rounded-xl opacity-0 transition-opacity duration-700 pointer-events-none bg-gradient-to-r from-primary/30 via-secondary/20 to-primary/30 blur-md",
          isHovered ? "opacity-100" : ""
        )}
      />

      <div className="relative">
        {product.image ? (
          <div className="relative w-full h-80 overflow-hidden">
            <div
              className={cn(
                "absolute inset-0 transition-transform duration-700 ease-out",
                isHovered ? "scale-105" : "scale-100"
              )}
            >
              <Image
                src={imageUrl(product.image)?.url() || ""}
                alt={product.name}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background" />
          </div>
        ) : (
          <div className="w-full h-80 bg-gradient-to-br from-accent/20 to-muted/10 flex items-center justify-center">
            <Tag size={64} className="text-primary/20" />
          </div>
        )}
        <div className="absolute top-4 right-4">
          <Badge className="bg-primary text-primary-foreground px-3 py-1.5 flex items-center shadow-lg shadow-primary/20">
            <Sparkles size={14} className="mr-1.5" />
            Featured
          </Badge>
        </div>
        {product.stock !== undefined &&
          product.stock <= 5 &&
          product.stock > 0 && (
            <div className="absolute top-4 left-4">
              <Badge
                variant="secondary"
                className="bg-background/80 backdrop-blur-sm shadow-md"
              >
                Only {product.stock} left
              </Badge>
            </div>
          )}

        {/* Floating feature badges */}
        <div
          className={cn(
            "absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2 flex items-center space-x-3 transition-all duration-500",
            isHovered
              ? "opacity-100 translate-y-1/2"
              : "opacity-90 translate-y-[40%]"
          )}
        >
          <div className="bg-background shadow-lg shadow-primary/10 rounded-full px-4 py-2 flex items-center space-x-2 border border-primary/20">
            <Download size={14} className="text-primary" />
            <span className="text-sm font-medium">Instant Download</span>
          </div>
          <div className="bg-background shadow-lg shadow-primary/10 rounded-full px-4 py-2 flex items-center space-x-2 border border-primary/20">
            <CheckCircle size={14} className="text-primary" />
            <span className="text-sm font-medium">Lifetime Access</span>
          </div>
        </div>
      </div>
      <CardHeader className="mt-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              {product.name}
            </CardTitle>
            {showPrice && (
              <CardDescription className="text-xl font-medium text-primary mt-2">
                {formattedPrice}
              </CardDescription>
            )}
          </div>
          <div className="flex items-center space-x-1 text-amber-400">
            <Star size={18} fill="currentColor" />
            <Star size={18} fill="currentColor" />
            <Star size={18} fill="currentColor" />
            <Star size={18} fill="currentColor" />
            <Star size={18} className="text-amber-400/30" />
            <span className="ml-1 text-sm text-muted-foreground">
              4.0 (124 reviews)
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {product.description && product.description.length > 0 && (
          <div className="prose dark:prose-invert prose-sm max-w-none">
            <PortableText
              value={product.description.slice(0, 1)}
              // @ts-ignore
              components={descriptionComponents}
            />
          </div>
        )}

        {/* Value propositions */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-accent/20 p-3 rounded-lg border border-accent/30 flex items-start space-x-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center text-primary">
              <Download size={20} />
            </div>
            <div>
              <h4 className="font-medium">Instant Access</h4>
              <p className="text-xs text-muted-foreground mt-1">
                Download immediately after purchase
              </p>
            </div>
          </div>
          <div className="bg-accent/20 p-3 rounded-lg border border-accent/30 flex items-start space-x-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center text-primary">
              <CheckCircle size={20} />
            </div>
            <div>
              <h4 className="font-medium">Lifetime Updates</h4>
              <p className="text-xs text-muted-foreground mt-1">
                Access all future improvements
              </p>
            </div>
          </div>
          <div className="bg-accent/20 p-3 rounded-lg border border-accent/30 flex items-start space-x-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center text-primary">
              <Users size={20} />
            </div>
            <div>
              <h4 className="font-medium">
                Developer Support for 3 days after purchase
              </h4>
              <p className="text-xs text-muted-foreground mt-1">
                Get help when you need it
              </p>
            </div>
          </div>
        </div>

        {product.productCategories && product.productCategories.length > 0 && (
          <div className="flex mt-6 gap-2 flex-wrap">
            {product.productCategories.map((category) => (
              <Badge
                key={category._id}
                variant="secondary"
                className="bg-secondary/40 hover:bg-secondary/60 transition-colors"
              >
                {category.name}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="bg-gradient-to-r from-accent/30 to-accent/10 py-5 flex justify-between items-center border-t border-primary/10">
        <div className="flex items-center space-x-2">
          <div className="flex -space-x-3">
            <div className="w-8 h-8 rounded-full bg-background border-2 border-accent flex items-center justify-center text-xs font-medium">
              JD
            </div>
            <div className="w-8 h-8 rounded-full bg-background border-2 border-accent flex items-center justify-center text-xs font-medium">
              SK
            </div>
            <div className="w-8 h-8 rounded-full bg-background border-2 border-accent flex items-center justify-center text-xs font-medium">
              +5
            </div>
          </div>
          <span className="text-sm text-muted-foreground">
            Recently purchased
          </span>
        </div>
        <Button
          size="lg"
          onClick={handleViewProduct}
          className={cn(
            "ml-auto bg-gradient-to-r from-primary to-primary/90 hover:bg-primary/90 text-primary-foreground transition-all duration-300",
            isButtonHovered
              ? "shadow-xl shadow-primary/20 translate-y-[-2px]"
              : ""
          )}
          disabled={product.stock === 0}
          onMouseEnter={() => setIsButtonHovered(true)}
          onMouseLeave={() => setIsButtonHovered(false)}
        >
          <ShoppingCart size={18} className="mr-2" />
          {ctaText}
          <ExternalLink size={14} className="ml-2 opacity-70" />
        </Button>
      </CardFooter>
    </Card>
  );
}

type ProductReferenceProps = {
  product?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "productType";
  };
  style?: "compact" | "full" | "featured";
  customCta?: string;
  showPrice?: boolean;
  _type: "productReference";
  _key: string;
};

// Product reference component that resolves the product data
export function ProductReference({ value }: { value: ProductReferenceProps }) {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch product data
  useEffect(() => {
    const getProduct = async () => {
      try {
        if (value.product && value.product._ref) {
          const productData = await fetchProduct(value.product._ref);
          setProduct(productData);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setIsLoading(false);
      }
    };

    getProduct();
  }, [value.product]);

  if (isLoading) {
    return (
      <Card className="my-6 p-6 border border-border/30 rounded-lg bg-background/60 shadow-sm">
        <div className="flex flex-col space-y-4 items-center justify-center">
          <div className="w-12 h-12 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
          <p className="text-sm text-muted-foreground">Loading product...</p>
        </div>
      </Card>
    );
  }

  if (!product) {
    return (
      <Card className="my-6 p-6 border border-border/30 rounded-lg bg-muted/10">
        <div className="flex flex-col items-center justify-center text-center py-4">
          <Tag size={24} className="text-muted-foreground/40 mb-2" />
          <p className="text-muted-foreground">Product not found</p>
        </div>
      </Card>
    );
  }

  return (
    <PremiumProductShowcase
      product={product}
      style={value.style}
      customCta={value.customCta}
      showPrice={value.showPrice}
    />
  );
}

// Add a function to fetch product data
async function fetchProduct(productRef: string) {
  return client.fetch(
    `
    *[_type == "productType" && _id == $productId][0]{
      _id,
      name,
      slug,
      image,
      description,
      price,
      productCategories[]->{
        _id,
        name
      },
      stock
    }
  `,
    { productId: productRef }
  );
}
