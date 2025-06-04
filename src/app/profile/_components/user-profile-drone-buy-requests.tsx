"use client";
import { CustomDroneBuyRequestClient } from "@/lib/types";
import { formatDate } from "date-fns";

const mockRequests = [
  {
    id: "req1",
    droneName: "Mavic 3 Enterprise",
    status: "Approved",
    requestedAt: "2025-06-01",
  },
  {
    id: "req2",
    droneName: "Matrice 30T",
    status: "Pending",
    requestedAt: "2025-06-03",
  },
];
type Props = {
  requests: CustomDroneBuyRequestClient[];
};
const UserProfileDroneBuyRequests = ({ requests }: Props) => {
  return (
    <section className="p-6 border rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">
        📦 Миний худалдан авах хүсэлтүүд
      </h2>
      <div className="space-y-4">
        {requests.map((req) => (
          <div key={req.id} className="border p-4 rounded shadow-sm">
            <p>
              <strong>Дрон:</strong> {req.drone.name}
            </p>
            <p>
              <strong>Төлөв:</strong>{" "}
              <span
                className={req.resolved ? "text-green-600" : "text-yellow-600"}
              >
                {req.resolved ? "Холбоо барьсан" : "Холбоо бариагүй!"}
              </span>
            </p>
            <p>
              <strong>Огноо:</strong>{" "}
              {formatDate(req.createdAt, "yyyy-mm-dd hh-mm")}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UserProfileDroneBuyRequests;
