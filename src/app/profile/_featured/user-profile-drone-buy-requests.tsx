'use client';
import { CustomDroneBuyRequestClient } from '@/lib/types';
import { formatDate } from 'date-fns';

type Props = {
  requests: CustomDroneBuyRequestClient[];
};
const UserProfileDroneBuyRequests = ({ requests }: Props) => {
  return (
    <section className="p-6 border rounded-lg shadow-sm w-full dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-900/50">
      <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">
        📦 Миний худалдан авах хүсэлтүүд
      </h2>
      <div className="space-y-4">
        {requests.map((req) => (
          <div
            key={req.id}
            className="border p-4 rounded shadow-sm flex flex-col gap-2 w-full dark:border-gray-700 dark:bg-gray-700/50 dark:shadow-gray-900/30"
          >
            <p className="text-sm sm:text-base dark:text-gray-300">
              <strong className="dark:text-gray-200">Дрон:</strong> {req.drone.name}
            </p>
            <p className="text-sm sm:text-base dark:text-gray-300">
              <strong className="dark:text-gray-200">Төлөв:</strong>{' '}
              <span
                className={
                  req.resolved
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-yellow-600 dark:text-yellow-400'
                }
              >
                {req.resolved ? 'Тантай холбоо барьсан байна' : 'Хараахан холбоо бариагүй!'}
              </span>
            </p>
            <p className="text-sm sm:text-base dark:text-gray-300">
              <strong className="dark:text-gray-200">Огноо:</strong>{' '}
              {formatDate(req.createdAt, 'yyyy-MM-dd HH:mm')}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UserProfileDroneBuyRequests;
