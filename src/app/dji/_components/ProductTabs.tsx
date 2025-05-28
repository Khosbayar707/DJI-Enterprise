"use client";
import { useState } from "react";
import { PlayCircleIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import { Drone } from "@/app/_types/types";
import { CustomDroneClient, ProductTabOptions } from "@/lib/types";

type ProductTabsProps = {
  description: Drone["description"];
  specifications: Drone["specifications"];
  accessories: Drone["accessories"];
  videoUrl: Drone["videoUrl"];
  drone: CustomDroneClient;
};

export default function ProductTabs({
  description,
  specifications,
  accessories,
  videoUrl,
  drone,
}: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<ProductTabOptions>(
    ProductTabOptions.features
  );

  return (
    <div className="mt-16 bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          {[
            { id: "features", label: "Бүтээгдэхүүний тайлбар" },
            { id: "specs", label: "Техникийн үзүүлэлт" },
            { id: "accessories", label: "Дагалдах хэрэгсэл" },
            { id: "reviews", label: "Үнэлгээ" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as ProductTabOptions)}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-6 md:p-8">
        {activeTab === "features" && (
          <FeaturesTab
            description={description}
            videoUrl={videoUrl}
            drone={drone}
          />
        )}

        {activeTab === "specs" && (
          <SpecsTab specifications={specifications} drone={drone} />
        )}
        {activeTab === "accessories" && (
          <AccessoriesTab accessories={accessories} drone={drone} />
        )}
        {activeTab === "reviews" && <ReviewsTab />}
      </div>
    </div>
  );
}

type TabContentProps = {
  description?: string;
  specifications?: Record<string, string>;
  accessories?: string[];
  videoUrl?: string;
  drone: CustomDroneClient;
};

const FeaturesTab = ({ drone }: TabContentProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">{drone.description}</h2>
      {drone.descriptions.length > 0
        ? drone.descriptions.map((description) => (
            <p key={description.id} className="text-gray-700 leading-relaxed">
              {description.description}
            </p>
          ))
        : ""}

      {drone.videos.length > 0 ? (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <PlayCircleIcon className="w-6 h-6 text-blue-600" />
            Видео танилцуулга
          </h3>
          <div className="relative overflow-hidden rounded-xl shadow-md aspect-w-16 aspect-h-9">
            <video
              muted
              autoPlay
              loop
              src={drone.videos[0].url}
              title="Product introduction video"
              className="w-full h-64 sm:h-96 lg:h-[500px]"
            ></video>
          </div>
        </div>
      ) : (
        "Бичлэг одоогоор алга!"
      )}
    </div>
  );
};

const SpecsTab = ({ specifications, drone }: TabContentProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Техникийн үзүүлэлт</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {drone.tech
          ? Object.entries(specifications || {}).map(([key, value]) => (
              <div key={key} className="border-b border-gray-100 pb-2">
                <dt className="text-sm font-medium text-gray-500 capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </dt>
                <dd className="mt-1 text-sm font-semibold text-gray-900">
                  {value}
                </dd>
              </div>
            ))
          : "Техникийн үзүүлэлт оруулаагүй байна!"}
      </div>
    </div>
  );
};

const AccessoriesTab = ({ drone }: TabContentProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Дагалдах хэрэгсэл</h2>
      <ul className="grid sm:grid-cols-2 gap-4">
        {drone.inTheBox.length > 0 ? "" : ""}
        {drone.inTheBox.map((item) => (
          <li key={item.id} className="flex items-start">
            <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span className="ml-2 text-gray-700">{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ReviewsTab = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Үнэлгээ</h2>
      <div className="bg-gray-50 p-6 rounded-lg">
        <p className="text-gray-600">
          Энэ бүтээгдэхүүнийг үнэлсэн хэрэглэгч байхгүй байна.
        </p>
      </div>
    </div>
  );
};
