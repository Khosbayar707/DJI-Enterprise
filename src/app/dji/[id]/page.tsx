'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Breadcrumbs from '../_components/Breadcrumbs';
import ProductGallery from '../_components/ProductGallery';
import ProductInfo from '../_components/ProductInfo';
import ProductTabs from '../_components/ProductTabs';
import ContactForm from '../_components/ContactForm';
import RelatedProducts from '../_components/RelatedProducts';
import { BreadcrumbItem } from '@/app/_types/types';
import { CustomDroneClient } from '@/lib/types';
import { useParams } from 'next/navigation';
import axios from 'axios';
import DroneDetailSkeleton from '@/app/_component/skeleton/dji-page-skeleton';
import LoanChances from '@/app/_component/LoanChances';

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
  }, [id]);

  useEffect(() => {
    if (!loading && drone) {
      const hash = window.location.hash;
      if (hash === '#contact-form') {
        const el = document.getElementById('contact-form');
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: 'smooth' });
          }, 300);
        }
      }
    }
  }, [loading, drone]);

  if (loading) return <DroneDetailSkeleton />;
  if (!drone) return <div className="flex justify-center min-h-screen">Бараа олдсонгүй!</div>;

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Нүүр', href: '/' },
    { label: 'Дрон', href: '/dji' },
    { label: drone.name, href: `/dji/${drone.id}` },
  ];

  const handleContactClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const contactForm = document.getElementById('contact-form');
      if (contactForm) contactForm.scrollIntoView({ behavior: 'smooth' });
    }, 800);
  };

  return (
    <>
      <Head>
        <title>{`${drone.name} | Инженер Геодези ХХК`}</title>
        <meta name="description" content={drone.description} />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-8 sm:py-10 lg:py-12">
            <Breadcrumbs items={breadcrumbItems} />

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
              <div className="order-1 lg:order-none">
                <ProductGallery drone={drone} />
              </div>

              <div className="order-2 lg:order-none lg:sticky lg:top-4">
                <ProductInfo
                  drone={drone}
                  onContactClick={handleContactClick}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </div>

          <div className="space-y-10 sm:space-y-12 lg:space-y-16 pb-12">
            <LoanChances />

            <ProductTabs drone={drone} />

            <div id="contact-form">
              <ContactForm />
            </div>

            <RelatedProducts />
          </div>
        </div>
      </div>
    </>
  );
}
