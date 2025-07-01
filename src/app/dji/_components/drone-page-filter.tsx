'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useMemo } from 'react';

const allTypes = ['Agriculture', 'Enterprise', 'Program', 'Consumer', 'Payload', 'Camera'];

const FilterButtons = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedTypes = useMemo(() => {
    const types = searchParams.getAll('type');
    return new Set(types);
  }, [searchParams]);

  const handleToggleType = (type: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (type === 'Бүгд') {
      allTypes.forEach((t) => params.delete('type'));
    } else {
      const types = new Set(params.getAll('type'));
      if (types.has(type)) {
        types.delete(type);
      } else {
        types.add(type);
      }
      params.delete('type');
      types.forEach((t) => params.append('type', t));
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const isAllSelected = selectedTypes.size === 0 || selectedTypes.size === allTypes.length;

  return (
    <div className="flex flex-wrap gap-3 py-4">
      <Badge
        onClick={() => handleToggleType('Бүгд')}
        className={cn(
          'cursor-pointer rounded-full border px-4 py-1.5 text-sm transition-all duration-200',
          isAllSelected
            ? 'bg-blue-600 text-white hover:bg-blue-700 border-blue-600'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        )}
      >
        Бүгд
      </Badge>

      {allTypes.map((type) => (
        <Badge
          key={type}
          onClick={() => handleToggleType(type)}
          className={cn(
            'cursor-pointer rounded-full border px-4 py-1.5 text-sm transition-all duration-200',
            selectedTypes.has(type)
              ? 'bg-blue-600 text-white hover:bg-blue-700 border-blue-600'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          )}
        >
          {type}
        </Badge>
      ))}
    </div>
  );
};

export default FilterButtons;
