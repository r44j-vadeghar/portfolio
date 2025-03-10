// src/components/about/Organization.tsx
import { ArrowUpRight } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

type OrganizationProps = {
  title: string;
  span: string;
  jobType: string;
  designation: string;
  link: string;
  logo?: StaticImageData;
  children: React.ReactNode;
};

export const Organization = ({
  title,
  span,
  jobType,
  designation,
  link,
  logo,
  children,
}: OrganizationProps) => {
  return (
    <Link
      href={link}
      className="group relative overflow-hidden rounded-xl border border-border bg-card/50 p-6 transition-all duration-300 hover:border-border/80 hover:bg-card/70 block"
    >
      <div className="flex justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            {logo && (
              <Image
                src={logo}
                alt=""
                width={32}
                height={32}
                className="h-8 w-8 rounded-md object-cover"
              />
            )}
            <div>
              <h3 className="text-lg font-semibold group-hover:underline">
                {title}
                <ArrowUpRight className="ml-2 hidden h-4 w-4 transition-transform group-hover:inline-block group-hover:text-muted-foreground" />
              </h3>
              <div className="text-sm">
                <p>{designation}</p>
                <p className="text-muted-foreground">{span}</p>
              </div>
            </div>
          </div>
        </div>

        <p className="h-fit rounded-md border-[0.5px] border-border bg-secondary/50 px-2 py-1 text-xs text-secondary-foreground">
          {jobType}
        </p>
      </div>

      <div className="mt-4 text-muted-foreground">{children}</div>

      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent to-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
    </Link>
  );
};

export default Organization;
