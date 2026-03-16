import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Мэдээ мэдээлэл | Djigeo.mn',
  description:
    'Технологийн салбарын хамгийн сүүлийн үеийн мэдээ, мэдээлэлтэй байнга холбоотой байх',
};

// Category colors mapping
const categoryColors: Record<
  string,
  { bg: string; text: string; darkBg: string; darkText: string }
> = {
  technology: {
    bg: 'bg-blue-100',
    text: 'text-blue-600',
    darkBg: 'dark:bg-blue-900/30',
    darkText: 'dark:text-blue-400',
  },
  business: {
    bg: 'bg-green-100',
    text: 'text-green-600',
    darkBg: 'dark:bg-green-900/30',
    darkText: 'dark:text-green-400',
  },
  science: {
    bg: 'bg-purple-100',
    text: 'text-purple-600',
    darkBg: 'dark:bg-purple-900/30',
    darkText: 'dark:text-purple-400',
  },
  design: {
    bg: 'bg-pink-100',
    text: 'text-pink-600',
    darkBg: 'dark:bg-pink-900/30',
    darkText: 'dark:text-pink-400',
  },
  default: {
    bg: 'bg-gray-100',
    text: 'text-gray-600',
    darkBg: 'dark:bg-gray-800',
    darkText: 'dark:text-gray-400',
  },
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

  // Group articles by date (this week, this month, older)
  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const groupedArticles = {
    thisWeek: articles.filter((a) => new Date(a.createdAt) >= oneWeekAgo),
    thisMonth: articles.filter((a) => {
      const date = new Date(a.createdAt);
      return date >= oneMonthAgo && date < oneWeekAgo;
    }),
    older: articles.filter((a) => new Date(a.createdAt) < oneMonthAgo),
  };

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - d.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Өнөөдөр';
    if (diffDays === 1) return 'Өчигдөр';
    if (diffDays < 7) return `${diffDays} хоногийн өмнө`;

    return new Intl.DateTimeFormat('mn-MN', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(d);
  };

  const getCategoryStyle = (category?: string | null) => {
    return categoryColors[category?.toLowerCase() || 'default'] || categoryColors.default;
  };

  const ArticleCard = ({
    article,
    featured = false,
    index = 0,
  }: {
    article: any;
    featured?: boolean;
    index?: number;
  }) => {
    const categoryStyle = getCategoryStyle(article.category);

    return (
      <Link
        key={article.id}
        href={`/news/${article.slug}`}
        className={`group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-500 ${
          featured ? 'col-span-2 md:col-span-2 lg:col-span-2 row-span-2' : ''
        } ${!featured && 'transform hover:-translate-y-2'}`}
      >
        {/* Image Container */}
        <div
          className={`relative ${featured ? 'h-64 md:h-96' : 'h-48 sm:h-52'} w-full overflow-hidden`}
        >
          {article.image?.url ? (
            <>
              <Image
                src={article.image.url}
                alt={article.title}
                fill
                sizes={
                  featured
                    ? '(max-width: 768px) 100vw, 66vw'
                    : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                }
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                priority={index < 3}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center">
              <svg
                className="w-16 h-16 text-blue-500 dark:text-blue-400 opacity-50 transform group-hover:scale-110 transition-transform duration-500"
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

          {/* Category Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${categoryStyle.bg} ${categoryStyle.text} ${categoryStyle.darkBg} ${categoryStyle.darkText} backdrop-blur-sm bg-opacity-90`}
            >
              {article.category || 'Мэдээ'}
            </span>
          </div>

          {/* Reading Time */}
          <div className="absolute top-4 right-4 z-10">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-black/50 text-white backdrop-blur-sm">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {Math.ceil(article.content?.length / 1000) || 5} мин
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 md:p-6">
          {/* Date and Author */}
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-3">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <time dateTime={article.createdAt.toISOString()}>
                {formatDate(article.createdAt)}
              </time>
            </div>

            {article.author && (
              <div className="flex items-center">
                <span className="w-1 h-1 bg-gray-400 rounded-full mx-2" />
                <span>{article.author}</span>
              </div>
            )}
          </div>

          {/* Title */}
          <h2
            className={`font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 ${
              featured ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'
            }`}
          >
            {article.title}
          </h2>

          {/* Summary */}
          <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base line-clamp-3 mb-4">
            {article.summary}
          </p>

          {/* Read More */}
          <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium text-sm group-hover:underline">
            <span>Цааш унших</span>
            <svg
              className="w-4 h-4 ml-1 group-hover:translate-x-2 transition-transform duration-300"
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

        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/50 rounded-2xl transition-all duration-500 pointer-events-none" />
      </Link>
    );
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-800 dark:via-indigo-800 dark:to-purple-800 py-20 md:py-28">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Breadcrumb */}
          <nav className="flex justify-center mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-blue-100">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Нүүр
                </Link>
              </li>
              <li>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </li>
              <li className="text-white font-medium">Мэдээ</li>
            </ol>
          </nav>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in">
            Мэдээ & Мэдээлэл
          </h1>

          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Технологи, инноваци, дижитал ертөнцийн хамгийн сүүлийн үеийн мэдээ, онцлох нийтлэлүүдтэй
            танилцаарай
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{articles.length}+</div>
              <div className="text-sm text-blue-200">Нийтлэлүүд</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">24/7</div>
              <div className="text-sm text-blue-200">Мэдээллийн урсгал</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">5</div>
              <div className="text-sm text-blue-200">Төрөл ангилал</div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="w-full h-auto"
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              className="fill-gray-50 dark:fill-gray-900"
            />
          </svg>
        </div>
      </section>

      {/* Articles Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {articles.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-3xl p-16 max-w-2xl mx-auto">
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping" />
                <div className="relative bg-white dark:bg-gray-700 rounded-full p-6 shadow-xl">
                  <svg
                    className="w-20 h-20 text-gray-400 dark:text-gray-500"
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
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Нийтлэл олдсонгүй
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Тун удахгүй шинэ мэдээ, мэдээллүүдээр тантай уулзана.
              </p>
              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Нүүр хуудас руу буцах
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Featured Article */}
            {groupedArticles.thisWeek.length > 0 && (
              <div className="mb-16">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    Онцлох мэдээ
                  </h2>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span>Шинэ</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {groupedArticles.thisWeek.slice(0, 1).map((article, index) => (
                    <ArticleCard key={article.id} article={article} featured index={index} />
                  ))}
                  {groupedArticles.thisWeek.slice(1, 4).map((article, index) => (
                    <ArticleCard key={article.id} article={article} index={index + 1} />
                  ))}
                </div>
              </div>
            )}

            {/* This Month's Articles */}
            {groupedArticles.thisMonth.length > 0 && (
              <div className="mb-16">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
                  Энэ сарын нийтлэлүүд
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {groupedArticles.thisMonth.map((article, index) => (
                    <ArticleCard key={article.id} article={article} index={index} />
                  ))}
                </div>
              </div>
            )}

            {/* Older Articles */}
            {groupedArticles.older.length > 0 && (
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
                  Өмнөх нийтлэлүүд
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {groupedArticles.older.map((article, index) => (
                    <ArticleCard key={article.id} article={article} index={index} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}
