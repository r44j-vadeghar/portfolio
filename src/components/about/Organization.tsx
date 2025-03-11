// src/components/about/Organization.tsx
import Image from "next/image";
import Link from "next/link";

interface OrganizationProps {
  title: string;
  span: string;
  jobType: string;
  designation: string;
  link: string;
  logo: string;
  children: React.ReactNode;
}

export default function Organization({
  title,
  span,
  jobType,
  designation,
  link,
  logo,
  children,
}: OrganizationProps) {
  return (
    <div className="rounded-xl border border-border bg-card/50 p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={logo}
            alt={title}
            width={48}
            height={48}
            className="rounded-md"
          />
          <div>
            <Link
              href={link}
              target="_blank"
              className="text-xl font-semibold hover:underline"
            >
              {title}
            </Link>
            <p className="text-sm text-muted-foreground">
              {designation} • {jobType}
            </p>
          </div>
        </div>
        <span className="text-sm text-muted-foreground">{span}</span>
      </div>
      <div className="text-card-foreground">{children}</div>
    </div>
  );
}
