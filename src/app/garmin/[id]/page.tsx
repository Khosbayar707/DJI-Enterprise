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
import RelatedProducts from "@/app/dji/_components/RelatedProducts";

const mockGarminProducts: GarminProduct[] = [
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

const relatedProducts: Product[] = [
  {
    id: "garmin-fenix-7",
    name: "Garmin Fenix 7",
    price: "5,999,000₮",
    description: "Premium multisport GPS watch with solar charging",
    image: "https://m.media-amazon.com/images/I/71m+5+b5WmL._AC_SL1500_.jpg",
  },
  {
    id: "garmin-venu-2-plus",
    name: "Garmin Venu 2 Plus",
    price: "3,999,000₮",
    description: "AMOLED smartwatch with voice assistant",
    image: "https://m.media-amazon.com/images/I/61XDeaOrjRL._AC_SL1500_.jpg",
  },
  {
    id: "garmin-forerunner-955",
    name: "Garmin Forerunner 955",
    price: "4,499,000₮",
    description: "Advanced running watch with solar charging",
    image: "https://m.media-amazon.com/images/I/71Qe9ZQ0VGL._AC_SL1500_.jpg",
  },
];

export default function Page() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<GarminProduct>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));

        const foundProduct = mockGarminProducts.find((p) => p.id === id);
        if (foundProduct) {
          setProduct(foundProduct);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

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
              <ProductGallery
                images={product.images}
                productName={product.name}
              />
              <ProductInfo
                product={product}
                onContactClick={handleContactClick}
                isLoading={isLoading}
              />
            </div>

            <ProductTabs
              features={product.features}
              specifications={product.specifications}
              description={product.description}
            />

            <ContactForm />

            <RelatedProducts products={relatedProducts} />
          </div>
        </div>
      </div>
    </>
  );
}
