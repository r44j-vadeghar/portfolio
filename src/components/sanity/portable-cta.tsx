import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PortableCta({
  value,
}: {
  value: {
    text?: string;
    url?: string;
    style?: "primary" | "secondary" | "ghost";
    _type: "cta";
    _key: string;
  };
}) {
  const { text, url, style = "primary" } = value;

  const variantMap = {
    primary: "default",
    secondary: "secondary",
    ghost: "ghost",
  } as const;

  const variant = variantMap[style as keyof typeof variantMap];

  return (
    <div className="my-6">
      <Button variant={variant} asChild>
        <Link href={url ?? "#"}>{text}</Link>
      </Button>
    </div>
  );
}
