"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import { BreadcrumbItem, GarminProduct, Product } from "@/app/_types/types";
import { useParams } from "next/navigation";
import LoadingText from "@/app/_component/LoadingText";
import Breadcrumbs from "@/app/dji/_components/Breadcrumbs";
import ProductGallery from "../_components/ProductGallery";
import ProductInfo from "../_components/ProductInfo";
import ProductTabs from "../_components/ProductTabs";
import ContactForm from "@/app/dji/_components/ContactForm";
import axios from "axios";
import { CustomGarminProduct } from "@/lib/types";

export default function Page() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<CustomGarminProduct>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/garmins/garmin?id=${id}`);
        if (res.data.success) {
          setProduct(res.data.data.product);
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
      <div className="flex justify-center min-h-screen">
        <LoadingText />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center min-h-screen">Бараа олдсонгүй!</div>
    );
  }

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Нүүр", href: "/" },
    { label: "Garmin", href: "/garmin" },
    { label: product.name, href: `/garmin/${product.id}` },
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
        <title>{`${product.name} | Манай компани`}</title>
        <meta name="description" content={product.description} />
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900 py-12 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-7xl mx-auto">
          <div className="min-h-screen">
            <Breadcrumbs items={breadcrumbItems} />

            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
              <ProductGallery product={product} />
              <ProductInfo
                product={product}
                onContactClick={handleContactClick}
                isLoading={isLoading}
              />
            </div>

            <ProductTabs
              features={product.features}
              // specifications={product.specifications}
              description={product.description}
            />

            <ContactForm />

            {/* <RelatedProducts /> */}
          </div>
        </div>
      </div>
    </>
  );
}
