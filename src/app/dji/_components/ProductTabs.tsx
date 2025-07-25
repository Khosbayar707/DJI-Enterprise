'use client';
import { useState } from 'react';
import { PlayCircleIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { CustomDroneClient, ProductTabOptions } from '@/lib/types';

type ProductTabsProps = {
  drone: CustomDroneClient;
};

export default function ProductTabs({ drone }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<ProductTabOptions>(ProductTabOptions.features);

  return (
    <div className="mt-16 bg-white rounded-xl shadow-lg overflow-hidden font-sans">
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          {[
            { id: 'features', label: 'Бүтээгдэхүүний тайлбар' },
            { id: 'specs', label: 'Техникийн үзүүлэлт' },
            { id: 'accessories', label: 'Дагалдах хэрэгсэл' },
            { id: 'reviews', label: 'Үнэлгээ' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as ProductTabOptions)}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm cursor-pointer ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-6 md:p-8 rounded-xl shadow-lg overflow-hidden border border-gray-100">
        {activeTab === 'features' && <FeaturesTab drone={drone} />}
        {activeTab === 'specs' && <SpecsTab drone={drone} />}
        {activeTab === 'accessories' && <AccessoriesTab drone={drone} />}
        {activeTab === 'reviews' && <ReviewsTab />}
      </div>
    </div>
  );
}

type TabContentProps = {
  drone: CustomDroneClient;
};

const FeaturesTab = ({ drone }: TabContentProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-gray-900">{drone.description}</h2>
      {drone.descriptions.length > 0 ? (
        drone.descriptions.map((description) => (
          <p key={description.id} className="text-base text-gray-700 leading-relaxed text-justify">
            {description.description}
          </p>
        ))
      ) : (
        <p className="text-sm text-gray-500 italic">Тайлбар оруулаагүй байна</p>
      )}

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900">
          <PlayCircleIcon className="w-6 h-6 text-blue-600" />
          Видео танилцуулга
        </h3>
        {drone.videos.length > 0 ? (
          <div className="relative overflow-hidden rounded-lg shadow-md aspect-w-16 aspect-h-9">
            <video
              muted
              autoPlay
              loop
              src={drone.videos[0].url}
              title="Product introduction video"
              className="w-full h-64 sm:h-96 lg:h-[500px]"
            ></video>
          </div>
        ) : (
          <p className="text-sm text-gray-500 italic">Бичлэг одоогоор алга!</p>
        )}
      </div>
    </div>
  );
};

const SpecsTab = ({ drone }: TabContentProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-gray-900">Техникийн үзүүлэлт</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {drone.tech ? (
          <>
            <div className="border-b border-gray-100 pb-2">
              <dt className="text-sm font-medium text-gray-500 capitalize">Жин</dt>
              <dd className="mt-1 text-base font-semibold text-gray-900">{drone.tech.weight}</dd>
            </div>
            <div className="border-b border-gray-100 pb-2">
              <dt className="text-sm font-medium text-gray-500 capitalize">Дээд хурд</dt>
              <dd className="mt-1 text-base font-semibold text-gray-900">{drone.tech.maxSpeed}</dd>
            </div>
            <div className="border-b border-gray-100 pb-2">
              <dt className="text-sm font-medium text-gray-500 capitalize">Температури</dt>
              <dd className="mt-1 text-base font-semibold text-gray-900">
                {drone.tech.operatingTemperature}
              </dd>
            </div>
            <div className="border-b border-gray-100 pb-2">
              <dt className="text-sm font-medium text-gray-500 capitalize">Орон зай</dt>
              <dd className="mt-1 text-base font-semibold text-gray-900">
                {drone.tech.dimensions}
              </dd>
            </div>
            <div className="border-b border-gray-100 pb-2">
              <dt className="text-sm font-medium text-gray-500 capitalize">Салхины эсэргүүцэл</dt>
              <dd className="mt-1 text-base font-semibold text-gray-900">
                {drone.tech.maxWindResistance}
              </dd>
            </div>
            <div className="border-b border-gray-100 pb-2">
              <dt className="text-sm font-medium text-gray-500 capitalize">Баттерей</dt>
              <dd className="mt-1 text-base font-semibold text-gray-900">{drone.tech.Battery}</dd>
            </div>
          </>
        ) : (
          <p className="text-sm text-gray-500 italic">Техникийн үзүүлэлт оруулаагүй байна!</p>
        )}
      </div>
    </div>
  );
};

const AccessoriesTab = ({ drone }: TabContentProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-gray-900">Дагалдах хэрэгсэл</h2>
      <ul className="grid sm:grid-cols-2 gap-4">
        {drone.inTheBox.length > 0 ? (
          drone.inTheBox.map((item) => (
            <li key={item.id} className="flex items-start">
              <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="ml-2 text-base text-gray-700">{item.name}</span>
            </li>
          ))
        ) : (
          <p className="text-sm text-gray-500 italic">Дагалдах хэрэгсэл байхгүй!</p>
        )}
      </ul>
    </div>
  );
};

const ReviewsTab = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-gray-900">Үнэлгээ</h2>
      <div className="bg-gray-50 p-6 rounded-lg">
        <p className="text-base text-gray-600">
          Энэ бүтээгдэхүүнийг үнэлсэн хэрэглэгч байхгүй байна.
        </p>
      </div>
    </div>
  );
};
