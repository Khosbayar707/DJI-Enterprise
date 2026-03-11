import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'News | Your Site Name',
  description: 'Stay updated with our latest news and announcements',
};

export default async function NewsPage() {
  const articles = await prisma.article.findMany({
    where: {
      published: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      image: true,
    },
  });

  // Format date function
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 py-16 md:py-24">
        <div className="absolute inset-0 bg-grid-white/[0.2] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-fade-in">
            Нийтлэл
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
            Шинэлэг мэдээллийг нэг дороос...
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {articles.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-12 max-w-md mx-auto">
              <svg
                className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Нийтлэл олдсонгүй
              </h3>
              <p className="text-gray-500 dark:text-gray-400">Дараа дахин хандана уу!</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            {articles.map((article, index) => (
              <Link
                key={article.id}
                href={`/news/${article.slug}`}
                className="group transform hover:-translate-y-1 transition-all duration-300"
              >
                <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden h-full flex flex-col">
                  {/* Image Container */}
                  {article.image?.url ? (
                    <div className="relative h-48 sm:h-52 md:h-56 w-full overflow-hidden">
                      <Image
                        src={article.image.url}
                        alt={article.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        priority={index < 3}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  ) : (
                    <div className="relative h-48 sm:h-52 md:h-56 w-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center">
                      <svg
                        className="w-16 h-16 text-blue-500 dark:text-blue-400 opacity-50"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}

                  <div className="p-5 md:p-6 flex-1 flex flex-col">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <time dateTime={article.createdAt.toISOString()}>
                        {formatDate(article.createdAt)}
                      </time>
                      <span className="mx-2">•</span>
                      <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full text-xs font-medium">
                        Article
                      </span>
                    </div>

                    <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                      {article.title}
                    </h2>

                    <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base line-clamp-3 mb-4 flex-1">
                      {article.summary}
                    </p>

                    <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium text-sm group-hover:underline">
                      Унших
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
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
