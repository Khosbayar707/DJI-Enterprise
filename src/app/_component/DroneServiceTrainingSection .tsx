"use client";
import { Button } from "@/components/ui/button";
import { Wrench, School } from "lucide-react";

export default function DroneServiceTrainingSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Дроны Засвар Үйлчилгээ & Сургалт
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Wrench className="w-8 h-8 text-blue-600 mr-3" />
              <h3 className="text-xl font-semibold">Дроны Засвар Үйлчилгээ</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Бид DJI брэндийн бүх төрлийн дроны засвар, оношилгоо, тохируулгыг
              мэргэжлийн өндөр түвшинд хийж гүйцэтгэдэг.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <span className="bg-blue-100 rounded-full p-1 mr-2">
                  <svg
                    className="w-3 h-3 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </span>
                Албан ёсны сэлбэг хэрэгсэл
              </li>
              <li className="flex items-center">
                <span className="bg-blue-100 rounded-full p-1 mr-2">
                  <svg
                    className="w-3 h-3 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </span>
                Мэргэжлийн инженерүүд
              </li>
              <li className="flex items-center">
                <span className="bg-blue-100 rounded-full p-1 mr-2">
                  <svg
                    className="w-3 h-3 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </span>
                Хурдан шуурхай засвар
              </li>
            </ul>
            <Button
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              Дэлгэрэнгүй мэдээлэл
            </Button>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <School className="w-8 h-8 text-green-600 mr-3" />
              <h3 className="text-xl font-semibold">
                Дроны Жолоодлогын Сургалт
              </h3>
            </div>
            <p className="text-gray-600 mb-4">
              Мэргэшсэн багш нартай дроны жолоодлого, FAA дүрэм, агаарын
              хөдөлгөөний тухай бүрэн хүрээнд суралцана.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <span className="bg-green-100 rounded-full p-1 mr-2">
                  <svg
                    className="w-3 h-3 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </span>
                Гэрчилгээ олгох сургалт
              </li>
              <li className="flex items-center">
                <span className="bg-green-100 rounded-full p-1 mr-2">
                  <svg
                    className="w-3 h-3 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </span>
                Практик дадлын хичээл
              </li>
              <li className="flex items-center">
                <span className="bg-green-100 rounded-full p-1 mr-2">
                  <svg
                    className="w-3 h-3 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </span>
                Хувийн болон бүлгийн сургалт
              </li>
            </ul>
            <Button
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-50"
            >
              Сургалтанд бүртгүүлэх
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
