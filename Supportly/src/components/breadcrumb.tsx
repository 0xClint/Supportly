"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import Link from "next/link";

// Optional: override specific path segments
const PATH_NAME_MAP: Record<string, string> = {
  dashboard: "Dashboard",
  create: "Create Service",
  wallet: "Wallet",
  settings: "Settings",
  profile: "My Profile",
};

function formatSegment(segment: string): string {
  if (PATH_NAME_MAP[segment]) return PATH_NAME_MAP[segment];
  return segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export const DynamicBreadcrumb = () => {
  const pathname = usePathname(); // e.g. "/dashboard/create"
  const segments = pathname.split("/").filter(Boolean); // ["dashboard", "create"]

  const crumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    return { label: formatSegment(segment), href };
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <div className="flex items-center" key={index}>
              <BreadcrumbItem className={index === 0 ? "hidden md:block" : ""}>
                {isLast ? (
                  <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={crumb.href}>{crumb.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && (
                <BreadcrumbSeparator
                  className={index === 0 ? "hidden md:block" : ""}
                />
              )}
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
