import { cn } from "@/lib/utils";
import Link from "next/link";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center h-12 space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Overview
      </Link>
      <Link
        href="/detail"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Detail View
      </Link>
      <Link
        href="/about"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        About
      </Link>
    </nav>
  );
}
