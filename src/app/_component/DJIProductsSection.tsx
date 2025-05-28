"use client";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CustomDroneClient } from "@/lib/types";
import axios from "axios";
import LoadingText from "./LoadingText";

export interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  features: string[];
  fullDescription?: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "DJI Mavic 3 Enterprise",
    description: "Мэргэжлийн зураг авалт, thermal камер, RTK модуль",
    image:
      "https://www-cdn.djiits.com/dps/45196aac8f231fe2ae211c76a473212b.jpg",
    features: ["4/3 CMOS сенсор", "56x zoom", "43 мин нислэгийн хугацаа"],
    fullDescription:
      "DJI Mavic 3 Enterprise нь мэргэжлийн түвшний агаарын зураг авалт, хайгуул судалгаа, барилгын хяналт зэрэг олон төрлийн үйл ажиллагаанд зориулагдсан.",
  },
  {
    id: 2,
    name: "DJI Matrice 30T",
    description:
      "Тепло камер, лазер зай хэмжигчтэй бүх төрлийн нисгэгчгүй систем",
    image:
      "https://www-cdn.djiits.com/dps/45196aac8f231fe2ae211c76a473212b.jpg",
    features: [
      "Hybrid optical zoom",
      "640x512 thermal camera",
      "IP55 усны хамгаалалт",
    ],
    fullDescription:
      "DJI Matrice 30T нь аврах ажиллагаа, хяналт шалгалт болон аюулгүй байдлын хэрэглээнд зориулсан, хүчирхэг мэдрэгчүүдтэй өндөр чанартай дрон юм.",
  },
  {
    id: 3,
    name: "DJI Phantom 4 RTK",
    description: "RTK технологиор байршлын нарийвчлалыг сайжруулсан дрон",
    image:
      "https://www-cdn.djiits.com/dps/45196aac8f231fe2ae211c76a473212b.jpg",
    features: [
      "RTK модуль",
      "Mechanical shutter",
      "2 см-ийн байрлалын нарийвчлал",
    ],
    fullDescription:
      "Phantom 4 RTK нь газрын зураглал, хэмжилтийн ажлуудад өндөр нарийвчлалтай мэдээлэл цуглуулах зориулалттай.",
  },
  {
    id: 4,
    name: "DJI M300 RTK",
    description: "Хүнд даацын хэрэглээнд зориулсан ухаалаг платформ",
    image:
      "https://www-cdn.djiits.com/dps/45196aac8f231fe2ae211c76a473212b.jpg",
    features: ["55 мин нислэг", "IP45 хамгаалалт", "AI хяналт шалгалт"],
    fullDescription:
      "Matrice 300 RTK нь үйлдвэрлэлийн хяналт, аврах ажиллагаа, эрчим хүчний шалгалт зэрэгт зориулагдсан ухаалаг, бат бөх дрон юм.",
  },
  {
    id: 5,
    name: "DJI Zenmuse H20T",
    description: "Multi-sensor payload for Matrice series",
    image:
      "https://www-cdn.djiits.com/dps/45196aac8f231fe2ae211c76a473212b.jpg",
    features: ["20 MP zoom", "640x512 thermal sensor", "Laser Rangefinder"],
    fullDescription:
      "Zenmuse H20T нь DJI Matrice 300 RTK дроны хамт хэрэглэгддэг, олон мэдрэгчтэй payload юм. Энэ нь олон талын шалгалт, судалгаанд төгс тохирно.",
  },
];

export default function DJIProductsSection() {
  const [drones, setDrones] = useState<CustomDroneClient[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/client/products/drones");
        if (res.data.success) {
          setDrones(res.data.data.drones);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">
            <span className="text-blue-600">DJI Enterprise</span>{" "}
            Бүтээгдэхүүнүүд
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Дэлхийд тэргүүлэгч DJI Enterprise бүтээгдэхүүнүүдийн жагсаалт
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loading ? (
            <LoadingText />
          ) : drones.length > 0 ? (
            drones.slice(0, 3).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={`/dji/${product.id}`}>
                  <ProductCard drone={product} index={index} />
                </Link>
              </motion.div>
            ))
          ) : (
            <div>Бараа дууссан байна!</div>
          )}
        </div>
      </div>
      <div className="text-center mt-12">
        <Link href="/dji">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Бүх бүтээгдэхүүнүүдийг харах
          </button>
        </Link>
      </div>
    </section>
  );
}
