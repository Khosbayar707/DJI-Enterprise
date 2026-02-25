'use client';

import { useMemo, useState } from 'react';
import { PlayCircleIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { CustomDroneClient, ProductTabOptions } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';

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

  const activeIndex = useMemo(() => TABS.findIndex((t) => t.id === activeTab), [activeTab]);

  return (
    <div
      className="
        mt-10
        rounded-3xl
        bg-white dark:bg-slate-900
        border border-gray-200 dark:border-gray-800
        shadow-xl dark:shadow-black/40
        overflow-hidden
        transition-colors duration-300
      "
    >
      {/* TAB HEADER */}
      <div className="relative border-b border-gray-200 dark:border-gray-800">
        <nav className="flex overflow-x-auto scrollbar-hide px-3 sm:px-6 py-3 gap-2">
          {TABS.map((tab) => {
            const isActive = tab.id === activeTab;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  relative px-4 py-2.5 rounded-full text-sm font-medium
                  transition-all duration-300 whitespace-nowrap
                  ${
                    isActive
                      ? 'text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
                  }
                `}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-full bg-blue-600"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* TAB CONTENT */}
      <div className="p-5 sm:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
          >
            {activeTab === ProductTabOptions.features && <FeaturesTab drone={drone} />}
            {activeTab === ProductTabOptions.specs && <SpecsTab drone={drone} />}
            {activeTab === ProductTabOptions.accessories && <AccessoriesTab drone={drone} />}
            {activeTab === ProductTabOptions.reviews && <ReviewsTab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ========================= */
/* FEATURES TAB */
/* ========================= */

function FeaturesTab({ drone }: { drone: CustomDroneClient }) {
  return (
    <div className="space-y-6">
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
        {drone.description}
      </h2>

      {drone.descriptions.length > 0 ? (
        drone.descriptions.map((d) => (
          <p
            key={d.id}
            className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed"
          >
            {d.description}
          </p>
        ))
      ) : (
        <p className="text-sm text-gray-500 italic">Тайлбар оруулаагүй байна</p>
      )}

      <section className="pt-4">
        <h3 className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
          <PlayCircleIcon className="w-5 h-5 text-blue-600" />
          Видео танилцуулга
        </h3>

        {drone.videos.length > 0 ? (
          <div className="mt-4 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-black shadow-md">
            <div className="aspect-video relative">
              <video
                muted
                autoPlay
                loop
                controls
                src={drone.videos[0].url}
                className="absolute inset-0 w-full h-full object-cover"
                playsInline
              />
            </div>
          </div>
        ) : (
          <div className="mt-4 bg-gray-50 dark:bg-slate-800 rounded-xl p-6 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 italic">Бичлэг одоогоор алга!</p>
          </div>
        )}
      </section>
    </div>
  );
}

/* ========================= */
/* SPECS TAB */
/* ========================= */

function SpecsTab({ drone }: { drone: CustomDroneClient }) {
  if (!drone.tech)
    return (
      <p className="text-sm text-gray-500 italic text-center py-6">
        Техникийн үзүүлэлт оруулаагүй байна!
      </p>
    );

  const specs = [
    { label: 'Жин', value: drone.tech.weight },
    { label: 'Дээд хурд', value: drone.tech.maxSpeed },
    { label: 'Температур', value: drone.tech.operatingTemperature },
    { label: 'Орон зай', value: drone.tech.dimensions },
    { label: 'Салхины эсэргүүцэл', value: drone.tech.maxWindResistance },
    { label: 'Баттерей', value: drone.tech.Battery },
  ];

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {specs.map((spec, i) => (
        <div
          key={i}
          className="
            p-4 rounded-xl
            border border-gray-200 dark:border-gray-700
            bg-gray-50 dark:bg-slate-800
            hover:shadow-md transition-all duration-300
          "
        >
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">{spec.label}</p>
          <p className="mt-1 font-semibold text-gray-900 dark:text-white">{spec.value}</p>
        </div>
      ))}
    </div>
  );
}

/* ========================= */
/* ACCESSORIES TAB */
/* ========================= */

function AccessoriesTab({ drone }: { drone: CustomDroneClient }) {
  return (
    <div className="space-y-4">
      {drone.inTheBox.length > 0 ? (
        drone.inTheBox.map((item) => (
          <div
            key={item.id}
            className="
              flex items-center gap-3 p-4
              rounded-xl
              border border-gray-200 dark:border-gray-700
              bg-gray-50 dark:bg-slate-800
              hover:shadow-md transition-all duration-300
            "
          >
            <CheckCircleIcon className="w-5 h-5 text-green-500" />
            <span className="text-gray-700 dark:text-gray-300">{item.name}</span>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-500 italic text-center py-6">Дагалдах хэрэгсэл байхгүй!</p>
      )}
    </div>
  );
}

/* ========================= */
/* REVIEWS TAB */
/* ========================= */

function ReviewsTab() {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-slate-800 p-6 text-center">
      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
        Энэ бүтээгдэхүүнийг үнэлсэн хэрэглэгч байхгүй байна.
      </p>
    </div>
  );
}
