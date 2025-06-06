'use client';

import { CustomSpecClient } from '@/lib/types';
import { motion } from 'framer-motion';
import Image from 'next/image';

type Props = {
  spec: CustomSpecClient;
};

export default function DetailSection({ spec }: Props) {
  return (
    <section className="py-16 px-6 bg-black text-white">
      <h1 className="text-center text-4xl font-bold pb-12">{spec.detail}</h1>
      <div className="max-w-7xl mx-auto space-y-24">
        {spec.image.length > 0 &&
          spec.image.map((img, idx) => (
            <motion.div
              key={img.id}
              className={`grid md:grid-cols-2 gap-12 items-center ${
                idx % 2 !== 0 ? 'md:flex-row-reverse' : ''
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className={idx % 2 !== 0 ? 'order-last md:order-first' : ''}>
                <div className="relative w-full h-64 md:h-96">
                  <Image
                    src={img.url}
                    alt={img.name}
                    fill
                    className="rounded-xl object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-4">{img.name || 'Зураг'}</h2>
                <p className="text-gray-400">{img.description || 'Тайлбар алга'}</p>
              </div>
            </motion.div>
          ))}
      </div>
      <div className="max-w-7xl mx-auto space-y-24 mt-24">
        {spec.videos.length > 0 &&
          spec.videos.map((vid, idx) => (
            <motion.div
              key={vid.id}
              className={`grid md:grid-cols-2 gap-12 items-center ${
                idx % 2 !== 0 ? 'md:flex-row-reverse' : ''
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className={idx % 2 !== 0 ? 'order-last md:order-first' : ''}>
                <video
                  src={vid.url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="rounded-xl w-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-4">{vid.name || 'Видео'}</h2>
                <p className="text-gray-400">{vid.detail || 'Тайлбар алга'}</p>
              </div>
            </motion.div>
          ))}
      </div>
      <h2 className="text-center text-2xl font-semibold py-12">{spec.previewText}</h2>
      <div className="max-w-7xl mx-auto space-y-16 py-12">
        {spec.descriptions.map((desc) => (
          <motion.div
            key={desc.id}
            className="flex flex-col items-start text-left w-full"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-2">{desc.highlight}</h3>
            <p className="text-gray-300">{desc.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
