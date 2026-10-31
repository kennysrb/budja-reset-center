import Image from "next/image";

interface ServiceCardProps {
  name: string;
  description: string;
  prices: { label: string; price: string }[];
  image?: string;
  /** Stagger delay for the scroll-reveal animation */
  delay?: number;
}

export function ServiceCard({ name, description, prices, image, delay = 0 }: ServiceCardProps) {
  return (
    <article
      data-reveal
      style={{ "--d": `${delay}ms` } as React.CSSProperties}
      className="card card-hover group overflow-hidden flex flex-col"
    >
      {image && (
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={image}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/85 via-espresso/20 to-transparent" />
          <h3 className="absolute bottom-0 left-0 right-0 p-6 font-heading text-xl md:text-2xl text-cream uppercase">
            {name}
          </h3>
        </div>
      )}
      <div className="p-6 flex flex-col gap-5 flex-1">
        {!image && <h3 className="font-heading text-xl text-light uppercase">{name}</h3>}
        <p className="text-muted text-sm leading-relaxed">{description}</p>
        <ul className="mt-auto flex flex-wrap gap-2">
          {prices.map((row) => (
            <li
              key={row.label}
              className="flex items-center gap-2 rounded-full border border-accent/20 bg-primary/60 pl-3 pr-1 py-1 text-sm"
            >
              <span className="text-muted">{row.label}</span>
              <span className="rounded-full bg-accent/15 text-accent font-semibold px-2.5 py-0.5">
                {row.price}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
