import { CustomDroneClient } from '@/lib/types';
import { CheckCircleIcon, ArrowPathIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

type ProductInfoProps = {
  onContactClick: () => void;
  isLoading: boolean;
  drone: CustomDroneClient;
};
export default function ProductInfo({ drone, onContactClick, isLoading }: ProductInfoProps) {
  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg space-y-6 sticky top-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          {drone.name}
        </h1>
        <div className="flex items-center mt-2">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className="w-5 h-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-gray-600 ml-2">(12 үнэлгээ)</span>
          </div>
        </div>
      </div>

      <p className="text-gray-700 leading-relaxed">
        {drone.briefDescription ?? 'Мэдээлэл одоогоор алга!'}
      </p>
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Үндсэн онцлогууд:</h3>
        <ul className="space-y-3">
          {drone.advantages.length > 0 ? (
            drone.advantages.slice(0, 5).map((advantage) => (
              <li key={advantage.id} className="flex items-start">
                <CheckCircleIcon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="ml-2 text-gray-800">{advantage.detail}</span>
              </li>
            ))
          ) : (
            <div>Мэдээлэл алга!</div>
          )}
        </ul>
      </div>
      <div className="pt-2 space-y-4">
        <button
          onClick={onContactClick}
          disabled={isLoading}
          className="w-full px-6 py-3 cursor-pointer bg-gradient-to-r from-blue-600 to-black text-white font-semibold text-lg rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:from-black hover:to-black active:scale-[0.98] disabled:opacity-70 flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <ArrowPathIcon className="w-5 h-5 mr-2 animate-spin" />
              Хүлээж байна...
            </>
          ) : (
            'Үнийн санал'
          )}
        </button>

        <Link href={`/preview/${drone.id}`}>
          <button className="w-full cursor-pointer px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold text-lg rounded-lg transition-all duration-300 hover:bg-blue-50 active:scale-[0.98] flex items-center justify-center">
            Танилцуулга
          </button>
        </Link>
      </div>
    </div>
  );
}
