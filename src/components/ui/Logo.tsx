import { cn } from "@/lib/cn";

// Wordmark: "BUDJA" over a small, wide-tracked "RESET CENTER", like the IG profile.
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex flex-col leading-none font-heading uppercase", className)}>
      <span className="text-accent text-xl tracking-[0.32em]">Budja</span>
      <span className="text-muted text-[0.6rem] tracking-[0.42em] mt-1.5">
        Reset Center
      </span>
    </span>
  );
}
