"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import Breadcrumbs from "../_components/Breadcrumbs";
import ProductGallery from "../_components/ProductGallery";
import ProductInfo from "../_components/ProductInfo";
import ProductTabs from "../_components/ProductTabs";
import ContactForm from "../_components/ContactForm";
import RelatedProducts from "../_components/RelatedProducts";
import Footer from "../_components/Footer";
import { BreadcrumbItem, Drone, Product } from "@/app/_types/types";

const drone: Drone = {
  id: "dji-mavic-3m",
  name: "DJI Mavic 3M",
  price: "7,999,000₮",
  discountPrice: "7,499,000₮",
  mainImage:
    "https://www-cdn.djiits.com/dps/45196aac8f231fe2ae211c76a473212b.jpg",
  images: [
    "https://www-cdn.djiits.com/dps/45196aac8f231fe2ae211c76a473212b.jpg",
    "https://www-cdn.djiits.com/dps/09d051de6f793363e331422963aabf1b.jpg",
    "https://www-cdn.djiits.com/dps/f4e2d8e9132b4014972ee29d5b49c364.jpg",
  ],
  description:
    "DJI Mavic 3M бол олон спектрийн камер болон RGB камерыг нэгтгэсэн, өндөр нарийвчлалтай агаарын зураглал хийх боломжтой дрон юм.",
  features: [
    "4 x 5MP олон спектрийн камер",
    "20MP RGB камер",
    "RTK модуль, сантиметрин нарийвчлал",
    "15 км O3 дамжуулалт",
    "43 минутын нислэгийн хугацаа",
  ],
  specifications: {
    weight: "920г",
    dimensions: "221×96.3×90.3мм (нугаслагдсан)",
    maxSpeed: "21м/с",
    maxWindResistance: "12м/с",
    operatingTemperature: "-10°C - 40°C",
    batteryCapacity: "5000мАц",
  },
  videoUrl: "https://www.youtube.com/embed/sample-video-id",
  accessories: [
    "3 ширхэг сэлбэг батерей",
    "Цэнэглэгч",
    "Тээврийн хайрцаг",
    "Пропелер сэлбэг",
    "Холбох кабель",
  ],
};

const relatedProducts: Product[] = [
  {
    id: "dji-mavic-3-classic",
    name: "DJI Mavic 3 Classic",
    price: "6,499,000₮",
    description: "4K камертай, 46 минутын нислэгийн хугацаа",
    image:
      "https://www-cdn.djiits.com/dps/09d051de6f793363e331422963aabf1b.jpg",
  },
  {
    id: "dji-mini-3-pro",
    name: "DJI Mini 3 Pro",
    price: "3,999,000₮",
    description: "Гялалзсан 4K HDR видео, 34 минут нислэг",
    image:
      "https://www-cdn.djiits.com/dps/45196aac8f231fe2ae211c76a473212b.jpg",
  },
  {
    id: "dji-air-2s",
    name: "DJI Air 2S",
    price: "4,499,000₮",
    description: "1 инчийн сенсортой 5.4K камер",
    image:
      "https://www-cdn.djiits.com/dps/45196aac8f231fe2ae211c76a473212b.jpg",
  },
];

export default function Page() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Нүүр", href: "/" },
    { label: "Дрон", href: "/drones" },
    { label: drone.name, href: `/drones/${drone.id}` },
  ];

  const handleContactClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const contactForm = document.getElementById("contact-form");
      if (contactForm) {
        contactForm.scrollIntoView({ behavior: "smooth" });
      }
    }, 800);
  };

  return (
    <>
      <Head>
        <title>{`${drone.name} | Инженер Геодези ХХК`}</title>
        <meta name="description" content={drone.description} />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900 py-12 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-7xl mx-auto">
          <Breadcrumbs items={breadcrumbItems} />

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
            <ProductGallery
              mainImage={drone.mainImage}
              images={drone.images}
              name={drone.name}
              discountPrice={drone.discountPrice}
            />

            <ProductInfo
              name={drone.name}
              price={drone.price}
              discountPrice={drone.discountPrice}
              description={drone.description}
              features={drone.features}
              onContactClick={handleContactClick}
              isLoading={isLoading}
            />
          </div>

          <ProductTabs
            description={drone.description}
            specifications={drone.specifications}
            accessories={drone.accessories}
            videoUrl={drone.videoUrl}
          />

          <ContactForm />

          <RelatedProducts products={relatedProducts} />

          <Footer />
        </div>
      </div>
    </>
  );
}
