'use client';

import { useState, useEffect } from 'react';
import Breadcrumbs from '../_components/Breadcrumbs';
import ProductGallery from '../_components/ProductGallery';
import ProductInfo from '../_components/ProductInfo';
import ProductTabs from '../_components/ProductTabs';
import ContactForm from '../_components/ContactForm';
import RelatedProducts from '../_components/RelatedProducts';
import { BreadcrumbItem } from '@/app/_types/types';
import { CustomDroneClient } from '@/lib/types';
import LoanChances from '@/app/_component/LoanChances';

export default function ClientPage({ drone }: { drone: CustomDroneClient }) {
  const [isLoading, setIsLoading] = useState(false);

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Нүүр',
                item: 'https://djigeo.mn',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Дрон',
                item: 'https://djigeo.mn/dji',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: drone.name,
                item: `https://djigeo.mn/dji/${drone.id}`,
              },
            ],
          }),
        }}
      />
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <Breadcrumbs items={breadcrumbItems} />

          <div className="grid lg:grid-cols-2 gap-10">
            <ProductGallery drone={drone} />

            <ProductInfo drone={drone} onContactClick={handleContactClick} isLoading={isLoading} />
          </div>

          <div className="space-y-20 mt-16">
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
