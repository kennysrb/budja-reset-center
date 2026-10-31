import { Metadata } from "next";
import { siteConfig } from "@/data/siteConfig";

// NOTE: This function is currently unused. Pages define metadata inline via generateMetadata().
// Remove if not needed, or adopt it to centralize metadata generation.
export function createMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url: path,
      siteName: siteConfig.name,
      type: "website",
    },
  };
}
