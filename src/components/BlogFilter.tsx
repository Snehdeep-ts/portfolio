'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';

interface BlogFilterProps {
  categories: string[];
  labels: string[];
}

export default function BlogFilter({ categories, labels }: BlogFilterProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentCategory = searchParams?.get('category') || '';
  const currentLabel = searchParams?.get('label') || '';

  const handleFilterChange = (type: 'category' | 'label', value: string) => {
    const params = new URLSearchParams(searchParams as URLSearchParams);
    if (value) {
      params.set(type, value);
    } else {
      params.delete(type);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mb-8 flex flex-wrap gap-4">
      <select
        value={currentCategory}
        onChange={(e) => handleFilterChange('category', e.target.value)}
        className="px-4 py-2 border rounded-md"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select
        value={currentLabel}
        onChange={(e) => handleFilterChange('label', e.target.value)}
        className="px-4 py-2 border rounded-md"
      >
        <option value="">All Labels</option>
        {labels.map((label) => (
          <option key={label} value={label}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
