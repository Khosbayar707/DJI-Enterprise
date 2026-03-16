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
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    include: { image: true },
  });

  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const groupedArticles = {
    thisWeek: articles.filter((a) => new Date(a.createdAt) >= oneWeekAgo),
    thisMonth: articles.filter((a) => {
      const d = new Date(a.createdAt);
      return d >= oneMonthAgo && d < oneWeekAgo;
    }),
    older: articles.filter((a) => new Date(a.createdAt) < oneMonthAgo),
  };

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    const now = new Date();
    const diffDays = Math.ceil(Math.abs(now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Өнөөдөр';
    if (diffDays === 1) return 'Өчигдөр';
    if (diffDays < 7) return `${diffDays} хоногийн өмнө`;

    return new Intl.DateTimeFormat('mn-MN', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(d);
  };

  const getCategoryStyle = (category?: string | null) =>
    categoryColors[category?.toLowerCase() || 'default'] || categoryColors.default;

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
    const readingTime = Math.max(1, Math.ceil((article.content?.length || 0) / 1200));

    return (
      <Link
        href={`/news/${article.slug}`}
        className={`group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-500
        ${
          featured ? 'col-span-1 sm:col-span-2 lg:col-span-2 sm:row-span-2' : 'hover:-translate-y-2'
        }`}
      >
        <div
          className={`relative ${
            featured ? 'h-52 sm:h-64 md:h-96' : 'h-40 sm:h-48 md:h-52'
          } w-full`}
        >
          {article.image?.url ? (
            <Image
              src={article.image.url}
              alt={article.title}
              fill
              sizes="(max-width:768px)100vw,(max-width:1200px)50vw,33vw"
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              priority={index < 2}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
              <span className="text-gray-400 text-sm">No Image</span>
            </div>
          )}

          <div className="absolute top-3 left-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${categoryStyle.bg} ${categoryStyle.text} ${categoryStyle.darkBg} ${categoryStyle.darkText}`}
            >
              {article.category || 'Мэдээ'}
            </span>
          </div>

          <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
            {readingTime} мин
          </div>
        </div>

        <div className="p-4 sm:p-5 md:p-6">
          <div className="flex items-center text-xs sm:text-sm text-gray-500 mb-2">
            <time>{formatDate(article.createdAt)}</time>
            {article.author && (
              <>
                <span className="mx-2">•</span>
                <span>{article.author}</span>
              </>
            )}
          </div>

          <h2
            className={`font-bold text-gray-900 dark:text-white mb-2 line-clamp-2
            ${featured ? 'text-xl sm:text-2xl md:text-3xl' : 'text-base sm:text-lg md:text-xl'}`}
          >
            {article.title}
          </h2>

          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base line-clamp-3 mb-3">
            {article.summary}
          </p>

          <span className="text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:underline">
            Цааш унших →
          </span>
        </div>
      </Link>
    );
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 py-16 sm:py-20 md:py-28 text-center text-white">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4">Мэдээ & Мэдээлэл</h1>
          <p className="text-sm sm:text-lg md:text-xl text-blue-100">
            Технологи болон дижитал ертөнцийн хамгийн сүүлийн үеийн мэдээ мэдээлэл
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24">
        {articles.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
              Нийтлэл олдсонгүй
            </h3>
          </div>
        ) : (
          <>
            {groupedArticles.thisWeek.length > 0 && (
              <div className="mb-16">
                <h2 className="text-2xl md:text-3xl font-bold mb-8 dark:text-white">
                  Онцлох мэдээ
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                  {groupedArticles.thisWeek.slice(0, 1).map((a, i) => (
                    <ArticleCard key={a.id} article={a} featured index={i} />
                  ))}

                  {groupedArticles.thisWeek.slice(1, 4).map((a, i) => (
                    <ArticleCard key={a.id} article={a} index={i} />
                  ))}
                </div>
              </div>
            )}

            {groupedArticles.thisMonth.length > 0 && (
              <div className="mb-16">
                <h2 className="text-2xl md:text-3xl font-bold mb-8 dark:text-white">
                  Энэ сарын нийтлэлүүд
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                  {groupedArticles.thisMonth.map((a, i) => (
                    <ArticleCard key={a.id} article={a} index={i} />
                  ))}
                </div>
              </div>
            )}

            {groupedArticles.older.length > 0 && (
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-8 dark:text-white">
                  Өмнөх нийтлэлүүд
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                  {groupedArticles.older.map((a, i) => (
                    <ArticleCard key={a.id} article={a} index={i} />
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
