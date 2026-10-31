import Image from "next/image";

interface PageHeroProps {
  title: string;
  subtitle?: string;
}

export function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="relative h-80 md:h-[26rem] overflow-hidden pt-24 md:pt-28 rounded-b-[2.5rem] md:rounded-b-[3.5rem]">
      <Image
        src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1920&auto=format&fit=crop&q=80"
        alt={title}
        fill
        priority
        className="object-cover animate-ken-burns"
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-espresso/65" />

      <div className="absolute inset-0 flex items-center justify-center pt-24 md:pt-28">
        <div className="text-center px-4">
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl text-cream uppercase tracking-[0.12em] mb-4 animate-fade-up [--d:100ms]">
            {title}
          </h1>
          {subtitle && (
            <p className="text-cream/80 text-base md:text-lg font-body max-w-xl mx-auto animate-fade-up [--d:300ms]">
              {subtitle}
            </p>
          )}
        </div>
      </div>

    </section>
  );
}
