import Image from "next/image";

interface PageHeroProps {
  title: string;
  subtitle?: string;
}

export function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="relative h-72 md:h-96 overflow-hidden pt-24 md:pt-28">
      <Image
        src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1920&auto=format&fit=crop&q=80"
        alt={title}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-black/70" />

      <div className="absolute inset-0 flex items-center justify-center pt-24 md:pt-28">
        <div className="text-center px-4">
          <h1 className="font-heading text-5xl md:text-7xl font-bold text-light uppercase tracking-wider mb-4">
            {title}
          </h1>
          {subtitle && (
            <p className="text-light/70 text-base md:text-lg font-body max-w-xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent/40" />
    </section>
  );
}
