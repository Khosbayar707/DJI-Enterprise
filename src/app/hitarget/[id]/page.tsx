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
import { CustomSurveyEquipment } from '@/lib/types';
import ContactSection from '@/app/_component/ContactSection';
import LoanChances from '@/app/_component/LoanChances';

export default function Page() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<CustomSurveyEquipment>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/hitargets/hitarget?id=${id}`);
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
      <div className="flex justify-center min-h-screen dark:bg-gray-900">
        <LoadingText />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center min-h-screen dark:bg-gray-900 dark:text-gray-200">
        Бараа олдсонгүй!
      </div>
    );
  }

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Нүүр', href: '/' },
    { label: 'Геодезийн багаж', href: '/hitarget' },
    { label: product.name, href: `/hitarget/${product.id}` },
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
        <meta name="description" content={product.description} />
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 py-12 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-200">
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
            <LoanChances />
            <div className="mt-8">
              <ContactSection />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
