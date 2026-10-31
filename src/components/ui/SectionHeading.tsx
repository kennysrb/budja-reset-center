interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionHeading({
  title,
  subtitle,
  centered = true,
}: SectionHeadingProps) {
  const alignClass = centered ? "text-center" : "text-left";

  return (
    <div className={`mb-12 ${alignClass}`}>
      <h2 className={`font-heading text-4xl md:text-5xl font-bold uppercase gold-gradient mb-4 tracking-wide`}>
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted text-lg max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
}
