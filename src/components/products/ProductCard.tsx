import Image from "next/image";

interface ProductCardProps {
  name: string;
  description: string;
  price: number;
  image: string;
  inStoreBadge: string;
}

export function ProductCard({
  name,
  description,
  price,
  image,
  inStoreBadge,
}: ProductCardProps) {
  return (
    <div className="bg-secondary border border-muted/20 rounded-lg overflow-hidden">
      <div>
        <Image
          src={image}
          alt={name}
          width={400}
          height={300}
          className="object-cover w-full h-48"
        />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-heading text-light">{name}</h3>
        <p className="text-accent font-semibold text-lg">${price}</p>
        <p className="text-muted text-sm mt-2">{description}</p>
        <span className="inline-block mt-4 px-3 py-1 rounded-full bg-accent/20 text-accent text-xs">
          {inStoreBadge}
        </span>
      </div>
    </div>
  );
}
