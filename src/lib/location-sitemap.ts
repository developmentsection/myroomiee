import { locationPages } from "./pg-locations";

export interface UniversalSitemapEntry {
  path: string;
  changefreq: "weekly" | "monthly" | "daily";
  priority: string;
}

export function resolveLocationSitemapEntries(): UniversalSitemapEntry[] {
  return Object.values(locationPages).map((page) => ({
    path: `/${page.slug}`,
    changefreq: "weekly",
    priority: page.pageType === "main-area" ? "0.95" : "0.82",
  }));
}
