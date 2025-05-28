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
import { CustomDroneClient } from "@/lib/types";
import { useParams } from "next/navigation";
import axios from "axios";
import LoadingText from "@/app/_component/LoadingText";

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
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [drone, setDrone] = useState<CustomDroneClient>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/client/products/drone?id=${id}`);
        if (res.data.success) {
          setDrone(res.data.data.drone);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className=" flex justify-center min-h-screen">
        <LoadingText />
      </div>
    );
  }

  if (!drone) {
    return (
      <div className=" flex justify-center min-h-screen">Бараа олдсонгүй!</div>
    );
  }

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Нүүр", href: "/" },
    { label: "Дрон", href: "/dji" },
    { label: drone.name, href: `/dji/${drone.id}` },
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
          <div className=" min-h-screen">
            <Breadcrumbs items={breadcrumbItems} />

            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
              <ProductGallery drone={drone} />
              <ProductInfo
                drone={drone}
                onContactClick={handleContactClick}
                isLoading={isLoading}
              />
            </div>
            <ProductTabs drone={drone} />
            <ContactForm />
            <RelatedProducts products={relatedProducts} />
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
