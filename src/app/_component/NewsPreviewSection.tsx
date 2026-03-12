'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

type Article = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  createdAt: string;
  image?: {
    url: string;
  };
};

export default function NewsPreviewSection() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('/api/articles?limit=3')
      .then((res) => {
        if (res.data.success) {
          setArticles(res.data.data.articles);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (date: string) => {
    const d = new Date(date);
    return `${d.getFullYear()} оны ${d.getMonth() + 1}-р сарын ${d.getDate()}`;
  };

  const renderMobileCards = () => (
    <div className="flex md:hidden overflow-x-auto gap-4 pb-6 snap-x snap-mandatory scrollbar-hide">
      {articles.map((article, index) => (
        <motion.div
          key={article.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex-shrink-0 w-[85%] sm:w-[70%] snap-center"
        >
          <Link
            href={`/news/${article.slug}`}
            className="group block bg-white dark:bg-gray-800/90 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
          >
            {article.image?.url && (
              <div className="relative h-56 w-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                <Image
                  src={article.image.url}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 85vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  priority={index < 2}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            )}

            <div className="p-5">
              <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-2 uppercase tracking-wider">
                {formatDate(article.createdAt)}
              </p>

              <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 line-clamp-2">
                {article.title}
              </h3>

              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed">
                {article.summary}
              </p>

              <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium">
                Дэлгэрэнгүй
                <svg
                  className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );

  const renderDesktopCards = () => (
    <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map((article, index) => (
        <motion.div
          key={article.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -8 }}
        >
          <Link
            href={`/news/${article.slug}`}
            className="group block bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 h-full flex flex-col"
          >
            {article.image?.url && (
              <div className="relative h-52 w-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                <Image
                  src={article.image.url}
                  alt={article.title}
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            )}

            <div className="p-6 flex-1 flex flex-col">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 font-medium">
                {formatDate(article.createdAt)}
              </p>

              <h3 className="font-bold text-xl mb-3 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 line-clamp-2">
                {article.title}
              </h3>

              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-4 leading-relaxed">
                {article.summary}
              </p>

              <div className="mt-auto inline-flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:gap-2 transition-all">
                Дэлгэрэнгүй унших
                <svg
                  className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );

  const renderSkeleton = () => (
    <>
      <div className="flex md:hidden gap-4 overflow-hidden">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex-shrink-0 w-[85%] sm:w-[70%]">
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse" />
          </div>
        ))}
      </div>

      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-80 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
        ))}
      </div>
    </>
  );

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 md:mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Сүүлийн үеийн мэдээлэл
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl">
              Манай хамгийн сүүлийн үеийн мэдээлэл, үйл явдлууд болон салбарын мэдээтэй танилцана уу
            </p>
          </div>

          <Link
            href="/news"
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium group"
          >
            Бүх мэдээг үзэх
            <svg
              className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>

        {loading ? (
          renderSkeleton()
        ) : articles.length > 0 ? (
          <>
            {renderMobileCards()}
            {renderDesktopCards()}
          </>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400">Мэдээ олдсонгүй</p>
          </div>
        )}

        {!loading && articles.length > 0 && (
          <div className="flex md:hidden justify-center gap-1 mt-4">
            {articles.map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
