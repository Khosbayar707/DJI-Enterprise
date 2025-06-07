'use client';
import { CustomDroneBuyRequestClient } from '@/lib/types';
import { formatDate } from 'date-fns';

type Props = {
  requests: CustomDroneBuyRequestClient[];
};
const UserProfileDroneBuyRequests = ({ requests }: Props) => {
  return (
    <section className="p-6 border rounded-lg shadow-sm w-full">
      <h2 className="text-xl font-semibold mb-4">📦 Миний худалдан авах хүсэлтүүд</h2>
      <div className="space-y-4">
        {requests.map((req) => (
          <div key={req.id} className="border p-4 rounded shadow-sm flex flex-col gap-2 w-full">
            <p className="text-sm sm:text-base">
              <strong>Дрон:</strong> {req.drone.name}
            </p>
            <p className="text-sm sm:text-base">
              <strong>Төлөв:</strong>{' '}
              <span className={req.resolved ? 'text-green-600' : 'text-yellow-600'}>
                {req.resolved ? 'Тантай холбоо барьсан байна' : 'Хараахан холбоо бариагүй!'}
              </span>
            </p>
            <p className="text-sm sm:text-base">
              <strong>Огноо:</strong> {formatDate(req.createdAt, 'yyyy-MM-dd HH:mm')}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UserProfileDroneBuyRequests;
