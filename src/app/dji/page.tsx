"use client";
import Link from "next/link";
import ProductCard from "../_component/ProductCard";

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

export default function ProductListPage() {
  return (
    <div className="bg-white">
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div key={index}>
                <Link href={`/dji/${product.id}`}>
                  <ProductCard
                    product={product}
                    index={index}
                    buttonText="Дэлгэрэнгүй"
                    buttonClassName="bg-blue-600 hover:bg-blue-700"
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
