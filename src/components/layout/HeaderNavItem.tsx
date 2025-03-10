import Link from "next/link";

type HeaderNavItemProps = {
  href: string;
  active: boolean;
  children: React.ReactNode;
};

export default function HeaderNavItem({
  href,
  active,
  children,
}: HeaderNavItemProps) {
  return (
    <Link
      href={href}
      className={`relative group block cursor-pointer font-medium text-sm capitalize outline-none transition-all hover:text-foreground px-3 p-1 ${
        active ? "text-foreground" : "text-foreground/70 no-underline"
      }`}
    >
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
