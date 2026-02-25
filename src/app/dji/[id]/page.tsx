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
  const [isLoading, setIsLoading] = useState(false);
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
          }, 250);
        }
      }
    }
  }, [loading, drone]);

  if (loading) return <DroneDetailSkeleton />;

  if (!drone)
    return (
      <div className="flex items-center justify-center min-h-screen text-base sm:text-lg dark:bg-slate-900 dark:text-white">
        Бараа олдсонгүй!
      </div>
    );

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
      if (contactForm) {
        contactForm.scrollIntoView({ behavior: 'smooth' });
      }
    }, 600);
  };

  return (
    <>
      <Head>
        <title>{`${drone.name} | Инженер Геодези ХХК`}</title>
        <meta name="description" content={drone.description} />
      </Head>

      <div
        className="
          min-h-screen
          bg-gradient-to-b
          from-gray-50 via-gray-100 to-gray-50
          dark:from-slate-950 dark:via-slate-900 dark:to-slate-950
          text-gray-900 dark:text-gray-100
          transition-colors duration-300
        "
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-10 sm:py-14 lg:py-20 space-y-6">
            <Breadcrumbs items={breadcrumbItems} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
              <div>
                <ProductGallery drone={drone} />
              </div>

              <div className="lg:sticky lg:top-8">
                <ProductInfo
                  drone={drone}
                  onContactClick={handleContactClick}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </div>

          <div className="space-y-16 sm:space-y-20 lg:space-y-24 pb-24">
            <section className="max-w-6xl mx-auto">
              <LoanChances />
            </section>

            <section className="max-w-5xl mx-auto">
              <ProductTabs drone={drone} />
            </section>

            <section
              id="contact-form"
              className="
                scroll-mt-32
                max-w-4xl mx-auto
              "
            >
              <ContactForm />
            </section>

            <section className="max-w-6xl mx-auto">
              <RelatedProducts />
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
