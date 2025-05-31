"use client";
import Link from "next/link";
import GarminProductCard from "./_components/ProductCard";

interface GarminProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  discountPrice?: number;
  imageUrl: string;
  features: string[];
  isNew?: boolean;
  rating: number;
}

export default function GarminProductListPage() {
  const products: GarminProduct[] = [
    {
      id: "garmin-fenix-7x",
      name: "Garmin Fenix 7X Sapphire Solar",
      category: "Smartwatch",
      price: 999.99,
      imageUrl:
        "https://m.media-amazon.com/images/I/71m+5+b5WmL._AC_SL1500_.jpg",
      features: ["Solar charging", "32GB memory", "Multi-band GNSS"],
      isNew: true,
      rating: 4.8,
    },
    {
      id: "garmin-venu-2-plus",
      name: "Garmin Venu 2 Plus",
      category: "Smartwatch",
      price: 399.99,
      imageUrl:
        "https://m.media-amazon.com/images/I/61XDeaOrjRL._AC_SL1500_.jpg",
      features: ["AMOLED display", "Voice assistant", "Sleep monitoring"],
      isNew: false,
      rating: 4.6,
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Garmin Products
          </h1>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, i) => (
                <div
                  key={product.id}
                  className="hover:shadow-lg transition-shadow duration-300"
                >
                  <Link href={`/garmin/${product.id}`} passHref>
                    <GarminProductCard product={product} index={i} />
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-10">
              Бүтээгдэхүүн олдсонгүй.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
