interface CalendlyLoaderProps {
  progress: number;
  text: string;
}

export function CalendlyLoader({ progress, text }: CalendlyLoaderProps) {
  return (
    <div className="absolute inset-0 bg-primary flex flex-col items-center justify-center z-10">
      <div className="relative select-none">
        <span className="font-heading text-2xl sm:text-4xl font-bold uppercase tracking-widest text-white/10">
          {text}
        </span>
        <span
          aria-hidden
          className="absolute inset-0 font-heading text-2xl sm:text-4xl font-bold uppercase tracking-widest text-white"
          style={{ clipPath: `inset(${100 - progress}% 0 0 0)` }}
        >
          {text}
        </span>
      </div>
      <p className="mt-5 font-body text-xs tracking-[0.4em] text-white/30 tabular-nums">
        {Math.round(progress)}%
      </p>
    </div>
  );
}
