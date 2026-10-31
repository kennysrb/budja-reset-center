"use client";

interface CategoryItem {
  value: string;
  label: string;
}

interface CategoryFilterProps {
  categories: CategoryItem[];
  activeCategory: string;
  onSelect: (value: string) => void;
}

export function CategoryFilter({
  categories,
  activeCategory,
  onSelect,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-row flex-wrap gap-3 justify-center mb-8">
      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onSelect(cat.value)}
          className={`px-4 py-2 rounded-full text-sm transition-colors ${
            activeCategory === cat.value
              ? "bg-accent text-primary"
              : "bg-secondary text-muted border border-muted/30"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
