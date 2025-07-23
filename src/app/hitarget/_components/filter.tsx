'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useMemo } from 'react';

const typeLabelToEnum: Record<string, string> = {
  'GNSS хүлээн авагч': 'GNSS',
  'Тотал станц': 'TOTAL_STATION',
  Теодолит: 'THEODOLITE',
  Нивелир: 'AUTO_LEVEL',
};

const allLabels = Object.keys(typeLabelToEnum);

const EquipmentFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedTypes = useMemo(() => {
    const types = searchParams.getAll('type');
    return new Set(types);
  }, [searchParams]);

  const handleToggleType = (label: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (label === 'Бүгд') {
      allLabels.forEach((lbl) => {
        const enumValue = typeLabelToEnum[lbl];
        params.delete('type');
      });
    } else {
      const enumType = typeLabelToEnum[label];
      const types = new Set(params.getAll('type'));

      if (types.has(enumType)) {
        types.delete(enumType);
      } else {
        types.add(enumType);
      }

      params.delete('type');
      types.forEach((t) => params.append('type', t));
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const isAllSelected = selectedTypes.size === 0 || selectedTypes.size === allLabels.length;

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

      {allLabels.map((label) => {
        const enumValue = typeLabelToEnum[label];
        const isSelected = selectedTypes.has(enumValue);

        return (
          <Badge
            key={label}
            onClick={() => handleToggleType(label)}
            className={cn(
              'cursor-pointer rounded-full border px-4 py-1.5 text-sm transition-all duration-200',
              isSelected
                ? 'bg-blue-600 text-white hover:bg-blue-700 border-blue-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            )}
          >
            {label}
          </Badge>
        );
      })}
    </div>
  );
};

export default EquipmentFilter;
