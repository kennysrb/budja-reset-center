import { notFound } from "next/navigation";

// Unknown paths 404 inside [locale]/layout.tsx, so they get <html>, header and footer.
export default function CatchAllPage() {
  notFound();
}
