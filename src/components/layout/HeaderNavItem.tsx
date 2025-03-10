import { useAuth } from "@clerk/nextjs";
import Link from "next/link";

type HeaderNavItemProps = {
  href: string;
  active: boolean;
  children: React.ReactNode;
  showAdmin?: boolean;
};

export default function HeaderNavItem({
  href,
  active,
  children,
  showAdmin = false,
}: HeaderNavItemProps) {
  const { userId } = useAuth();

  const isAdmin = (userId: string) => {
    const ADMIN_USER_IDS =
      process.env.NEXT_PUBLIC_ADMIN_USER_IDS?.split(",") || [];
    return ADMIN_USER_IDS.includes(userId);
  };

  if (showAdmin && (!userId || !isAdmin(userId))) {
    return null;
  }

  const className = `relative group block cursor-pointer font-medium text-sm capitalize outline-none transition-all hover:text-foreground px-3 p-1 ${
    active ? "text-foreground" : "text-foreground/70 no-underline"
  }`;

  return (
    <Link href={href} className={className}>
      {children}
      {active && (
        <span
          id="active-nav-item"
          className="absolute inset-0 rounded-lg bg-primary/10"
        />
      )}
    </Link>
  );
}
