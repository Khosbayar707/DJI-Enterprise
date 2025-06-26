'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { BreadcrumbItem } from '@/app/_types/types';
import { useParams } from 'next/navigation';
import LoadingText from '@/app/_component/LoadingText';
import Breadcrumbs from '@/app/dji/_components/Breadcrumbs';
import PayloadGallery from '../_components/PayloadGallery';
import PayloadInfo from '../_components/PayloadInfo';
import axios from 'axios';
import { CustomPayload } from '@/lib/types';
import ContactSection from '@/app/_component/ContactSection';

export default function Page() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [payload, setPayload] = useState<CustomPayload>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/payloads/payload?id=${id}`);
        if (res.data.success) {
          setPayload(res.data.data.payload);
        }
      } catch (err) {
        console.error('Payload fetch error:', err);
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

  if (!payload) {
    return <div className="flex justify-center min-h-screen">Payload олдсонгүй!</div>;
  }

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Нүүр', href: '/' },
    { label: 'DJI Payload', href: '/payload' },
    { label: payload.name, href: `/payload/${payload.id}` },
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
        <title>{`${payload.name} | Манай компани`}</title>
        <meta name="description" content={payload.description} />
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900 py-12 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-7xl mx-auto">
          <div className="min-h-screen">
            <Breadcrumbs items={breadcrumbItems} />

            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
              <PayloadGallery payload={payload} />
              <PayloadInfo
                payload={payload}
                onContactClick={handleContactClick}
                isLoading={isLoading}
              />
            </div>
            <ContactSection />
          </div>
        </div>
      </div>
    </>
  );
}
