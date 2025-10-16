'use client';

import { useMemo, useState } from 'react';
import { PlayCircleIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { CustomDroneClient, ProductTabOptions } from '@/lib/types';

type ProductTabsProps = {
  drone: CustomDroneClient;
};

const TABS: { id: ProductTabOptions; label: string }[] = [
  { id: ProductTabOptions.features, label: 'Бүтээгдэхүүний тайлбар' },
  { id: ProductTabOptions.specs, label: 'Техникийн үзүүлэлт' },
  { id: ProductTabOptions.accessories, label: 'Дагалдах хэрэгсэл' },
  { id: ProductTabOptions.reviews, label: 'Үнэлгээ' },
];

export default function ProductTabs({ drone }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<ProductTabOptions>(ProductTabOptions.features);

  // For the moving active-indicator width/left
  const activeIndex = useMemo(() => TABS.findIndex((t) => t.id === activeTab), [activeTab]);

  return (
    <div className="mt-6 sm:mt-10 bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Tab bar */}
      <div className="relative border-b border-gray-200">
        <nav
          className="flex gap-2 overflow-x-auto no-scrollbar px-2 py-2 sm:px-4 sm:py-3"
          role="tablist"
          aria-label="Product sections"
        >
          {TABS.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                role="tab"
                aria-selected={isActive}
                className={[
                  // size & shape
                  'px-3 py-2 sm:px-4 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium',
                  // colors
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                  // interaction
                  'transition-colors whitespace-nowrap',
                ].join(' ')}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>
        {/* Thin underline on desktop to echo structure (mobile pills already distinct) */}
        <div className="hidden sm:block absolute bottom-0 left-0 right-0 h-px bg-gray-200" />
      </div>

      {/* Tab content container */}
      <div className="p-4 sm:p-6 md:p-8">
        {activeTab === ProductTabOptions.features && <FeaturesTab drone={drone} />}
        {activeTab === ProductTabOptions.specs && <SpecsTab drone={drone} />}
        {activeTab === ProductTabOptions.accessories && <AccessoriesTab drone={drone} />}
        {activeTab === ProductTabOptions.reviews && <ReviewsTab />}
      </div>
    </div>
  );
}

/* -------------------- Content Tabs -------------------- */

type TabContentProps = { drone: CustomDroneClient };

function FeaturesTab({ drone }: TabContentProps) {
  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Title/lede on mobile kept tight */}
      <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
        {drone.description}
      </h2>

      {drone.descriptions.length > 0 ? (
        <div className="space-y-3 sm:space-y-4">
          {drone.descriptions.map((d) => (
            <p
              key={d.id}
              className="text-sm sm:text-base text-gray-700 leading-relaxed sm:leading-8 text-justify"
            >
              {d.description}
            </p>
          ))}
        </div>
      ) : (
        <p className="text-xs sm:text-sm text-gray-500 italic py-2">Тайлбар оруулаагүй байна</p>
      )}

      {/* Video */}
      <section className="pt-2 sm:pt-4">
        <h3 className="text-sm sm:text-base font-semibold mb-3 sm:mb-4 flex items-center gap-2 text-gray-900">
          <PlayCircleIcon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
          Видео танилцуулга
        </h3>
        {drone.videos.length > 0 ? (
          <div className="relative overflow-hidden rounded-xl shadow-md bg-black">
            {/* Aspect-ratio responsive container for mobile-first */}
            <div className="relative w-full aspect-video sm:aspect-[16/9]">
              <video
                muted
                autoPlay
                loop
                controls
                src={drone.videos[0].url}
                title="Product introduction video"
                className="absolute inset-0 h-full w-full object-cover"
                playsInline
              />
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-xl p-5 sm:p-6 text-center">
            <p className="text-xs sm:text-sm text-gray-500 italic">Бичлэг одоогоор алга!</p>
          </div>
        )}
      </section>
    </div>
  );
}

function SpecsTab({ drone }: TabContentProps) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-base sm:text-lg font-bold text-gray-900">Техникийн үзүүлэлт</h2>

      {drone.tech ? (
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {[
            { label: 'Жин', value: drone.tech.weight },
            { label: 'Дээд хурд', value: drone.tech.maxSpeed },
            { label: 'Температур', value: drone.tech.operatingTemperature },
            { label: 'Орон зай', value: drone.tech.dimensions },
            { label: 'Салхины эсэргүүцэл', value: drone.tech.maxWindResistance },
            { label: 'Баттерей', value: drone.tech.Battery },
          ].map(({ label, value }, i) => (
            <div
              key={i}
              className="rounded-lg border border-gray-100 bg-white p-3 sm:p-4 shadow-sm"
            >
              <dt className="text-[11px] sm:text-xs font-medium text-gray-500">{label}</dt>
              <dd className="mt-1 text-sm sm:text-base font-semibold text-gray-900">{value}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className="text-xs sm:text-sm text-gray-500 italic py-4 text-center">
          Техникийн үзүүлэлт оруулаагүй байна!
        </p>
      )}
    </div>
  );
}

function AccessoriesTab({ drone }: TabContentProps) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-base sm:text-lg font-bold text-gray-900">Дагалдах хэрэгсэл</h2>

      {drone.inTheBox.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          {drone.inTheBox.map((item) => (
            <li
              key={item.id}
              className="flex items-start gap-2 rounded-lg border border-gray-100 bg-white p-3 shadow-sm"
            >
              <CheckCircleIcon className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-0.5" />
              <span className="text-sm sm:text-base text-gray-700 leading-relaxed">
                {item.name}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-xs sm:text-sm text-gray-500 italic py-2 text-center">
          Дагалдах хэрэгсэл байхгүй!
        </p>
      )}
    </div>
  );
}

function ReviewsTab() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-base sm:text-lg font-bold text-gray-900">Үнэлгээ</h2>
      <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 sm:p-6 text-center">
        <p className="text-sm sm:text-base text-gray-600">
          Энэ бүтээгдэхүүнийг үнэлсэн хэрэглэгч байхгүй байна.
        </p>
      </div>
    </div>
  );
}

/* Hide native scrollbar on mobile for the tab row */
<style jsx global>{`
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`}</style>;
