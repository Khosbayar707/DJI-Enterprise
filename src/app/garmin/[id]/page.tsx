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
      if (contactForm) {
        contactForm.scrollIntoView({ behavior: 'smooth' });
      }
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
        py-10 sm:py-12
        px-4 sm:px-6 lg:px-8
        font-sans
        transition-colors duration-300
      "
      >
        <div className="max-w-7xl mx-auto">
          <Breadcrumbs items={breadcrumbItems} />

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start mt-6">
            <div className="rounded-2xl bg-white dark:bg-slate-900 shadow-sm dark:shadow-lg transition-all duration-300">
              <ProductGallery product={product} />
            </div>

            <div className="lg:sticky lg:top-6">
              <div className="rounded-2xl bg-white dark:bg-slate-900 shadow-sm dark:shadow-lg p-4 sm:p-6 transition-all duration-300">
                <ProductInfo
                  product={product}
                  onContactClick={handleContactClick}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </div>

          <div className="mt-12 sm:mt-16">
            <LoanChances />
          </div>

          <div id="contact-form" className="scroll-mt-28 mt-12 sm:mt-16">
            <ContactSection />
          </div>
        </div>
      </div>
    </>
  );
}
