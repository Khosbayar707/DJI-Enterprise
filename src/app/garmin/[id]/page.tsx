'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { BreadcrumbItem } from '@/app/_types/types';
import { useParams } from 'next/navigation';
import LoadingText from '@/app/_component/LoadingText';
import Breadcrumbs from '@/app/dji/_components/Breadcrumbs';
import ProductGallery from '../_components/ProductGallery';
import ProductInfo from '../_components/ProductInfo';
import axios from 'axios';
import { CustomGarminProduct } from '@/lib/types';
import ContactSection from '@/app/_component/ContactSection';
import LoanChances from '@/app/_component/LoanChances';

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
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white dark:bg-[#0B1120] transition-colors duration-300">
        <LoadingText />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white dark:bg-[#0B1120] text-gray-800 dark:text-gray-200 transition-colors duration-300">
        Бараа олдсонгүй!
      </div>
    );
  }

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Нүүр', href: '/' },
    { label: 'Garmin', href: '/garmin' },
    { label: product.name, href: `/garmin/${product.id}` },
  ];

  const handleContactClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const contactForm = document.getElementById('contact-form');
      contactForm?.scrollIntoView({ behavior: 'smooth' });
    }, 800);
  };

  return (
    <>
      <Head>
        <title>{`${product.name} | Манай компани`}</title>
        <meta
          name="description"
          content={product.description || `${product.name} - Garmin албан ёсны бүтээгдэхүүн`}
        />
      </Head>

      <div
        className="
          min-h-screen
          bg-gradient-to-b
          from-gray-50 to-gray-100
          dark:from-[#0B1120] dark:to-[#111827]
          text-gray-900 dark:text-gray-100
          transition-colors duration-300
        "
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <Breadcrumbs items={breadcrumbItems} />

          <div
            className="
            grid
            gap-8
            md:gap-12
            lg:gap-16
            mt-6
            lg:grid-cols-2
            items-start
          "
          >
            <div
              className="
              rounded-2xl
              bg-white dark:bg-slate-900
              shadow-sm sm:shadow-md
              lg:shadow-lg
              transition-all duration-300
            "
            >
              <ProductGallery product={product} />
            </div>

            <div className="xl:sticky xl:top-10">
              <div
                className="
                rounded-2xl
                bg-white dark:bg-slate-900
                shadow-sm sm:shadow-md
                lg:shadow-lg
                p-4 sm:p-6 lg:p-8
                transition-all duration-300
              "
              >
                <ProductInfo
                  product={product}
                  onContactClick={handleContactClick}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </div>

          <div className="mt-14 sm:mt-16 lg:mt-20">
            <LoanChances />
          </div>

          <div id="contact-form" className="scroll-mt-32 mt-14 sm:mt-16 lg:mt-20">
            <ContactSection />
          </div>
        </div>
      </div>
    </>
  );
}
