interface ServiceCardProps {
  name: string;
  description: string;
  price: number;
  duration: string;
}

export function ServiceCard({
  name,
  description,
  price,
  duration,
}: ServiceCardProps) {
  return (
    <div className="bg-secondary border border-white/10 rounded-lg p-6 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-xl font-semibold text-light">{name}</h3>
        <span className="text-accent font-bold text-xl">${price}</span>
      </div>
      <p className="text-muted text-sm">{duration}</p>
      <p className="text-light/80 text-sm">{description}</p>
    </div>
  );
}
