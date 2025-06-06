import { useState } from "react";

interface ProductTabsProps {
  features: string[];
  // specifications: { label: string; value: string }[];
  description: string;
}

export default function ProductTabs({
  features,
  // specifications,
  description,
}: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="mt-16">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            className={`px-1 py-4 text-sm font-medium ${activeTab === "description" ? "border-b-2 border-blue-500 text-blue-600" : "border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
            onClick={() => setActiveTab("description")}
          >
            Тайлбар
          </button>
          <button
            className={`px-1 py-4 text-sm font-medium ${activeTab === "features" ? "border-b-2 border-blue-500 text-blue-600" : "border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
            onClick={() => setActiveTab("features")}
          >
            Онцлог
          </button>
          <button
            className={`px-1 py-4 text-sm font-medium ${activeTab === "specs" ? "border-b-2 border-blue-500 text-blue-600" : "border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
            onClick={() => setActiveTab("specs")}
          >
            Техникийн үзүүлэлт
          </button>
        </nav>
      </div>

      <div className="py-8">
        {activeTab === "description" && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Бүтээгдэхүүний тайлбар
            </h3>
            <p className="text-gray-700 whitespace-pre-line">{description}</p>
          </div>
        )}

        {activeTab === "features" && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Үндсэн онцлог
            </h3>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "specs" && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Техникийн үзүүлэлт
            </h3>
            {/* <div className="bg-gray-50 rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="bg-white divide-y divide-gray-200">
                  {specifications.map((spec, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 w-1/3">
                        {spec.label}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
}
