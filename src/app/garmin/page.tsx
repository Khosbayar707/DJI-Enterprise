"use client";
import Link from "next/link";
import GarminProductCard from "./_components/ProductCard";
import { GarminProduct } from "../_types/types";

export default function GarminProductListPage() {
  const products: GarminProduct[] = [
    {
      id: "garmin-fenix-7x",
      name: "Garmin Fenix 7X Sapphire Solar",
      category: "Smartwatch",
      price: 6999000,
      discountPrice: 5999000,
      description:
        "The Fenix 7X Sapphire Solar is Garmin's premium multisport GPS watch with solar charging. Built to withstand the toughest environments with scratch-resistant sapphire lens and stainless steel bezel.",
      features: [
        "Solar charging extends battery life",
        "32GB memory for maps and music",
        "Multi-band GNSS for improved accuracy",
        "Up to 37 days battery life in smartwatch mode",
        "Touchscreen with sunlight-visible display",
      ],
      specifications: [
        {
          label: "Display",
          value: '1.4" sunlight-visible, transflective memory-in-pixel (MIP)',
        },
        { label: "Dimensions", value: "51 x 51 x 14.9 mm" },
        { label: "Weight", value: "89 g" },
        { label: "Water Rating", value: "10 ATM" },
        { label: "Connectivity", value: "Bluetooth, ANT+, Wi-Fi" },
      ],
      images: [
        "https://m.media-amazon.com/images/I/71m+5+b5WmL._AC_SL1500_.jpg",
        "https://m.media-amazon.com/images/I/71q2Q4yVzKL._AC_SL1500_.jpg",
        "https://m.media-amazon.com/images/I/71Qe9ZQ0VGL._AC_SL1500_.jpg",
      ],
      rating: 4.8,
      reviewCount: 124,
      isNew: true,
      inStock: true,
    },
    {
      id: "garmin-venu-2-plus",
      name: "Garmin Venu 2 Plus",
      category: "Smartwatch",
      price: 3999000,
      description:
        "AMOLED smartwatch with voice assistant and advanced health monitoring features.",
      features: [
        "Brilliant AMOLED display",
        "Voice assistant support",
        "Up to 9 days battery life",
        "Advanced sleep monitoring",
        "On-screen workouts",
      ],
      specifications: [
        { label: "Display", value: '1.3" AMOLED (416 x 416 pixels)' },
        { label: "Dimensions", value: "43.6 x 43.6 x 12.2 mm" },
        { label: "Weight", value: "51 g" },
        { label: "Water Rating", value: "5 ATM" },
        { label: "Connectivity", value: "Bluetooth, Wi-Fi" },
      ],
      images: [
        "https://m.media-amazon.com/images/I/61XDeaOrjRL._AC_SL1500_.jpg",
        "https://m.media-amazon.com/images/I/71+QN8xVWBL._AC_SL1500_.jpg",
      ],
      rating: 4.6,
      reviewCount: 89,
      inStock: true,
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
