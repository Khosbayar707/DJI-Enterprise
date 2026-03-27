import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Calendar, Clock, ArrowLeft, Share2 } from 'lucide-react';
import ShareButton from '../_components/ShareButton';

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const article = await prisma.article.findUnique({
    where: { slug },
    include: { image: true },
  });

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  const baseUrl = 'https://www.djigeo.mn';

  const imageUrl = article.image?.url
    ? article.image.url.startsWith('http')
      ? article.image.url
      : `${baseUrl}${article.image.url}`
    : `${baseUrl}/default-og.jpg`;

  return {
    title: `${article.title} | DJIGEO`,
    description: article.summary || 'Read our latest article',

    openGraph: {
      title: article.title,
      description: article.summary || '',
      url: `${baseUrl}/news/${article.slug}`,
      siteName: 'DJIGEO',
      type: 'article',
      publishedTime: article.createdAt.toISOString(),

      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.summary || '',
      images: [imageUrl],
    },
  };
}

function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  const readTime = Math.ceil(wordCount / wordsPerMinute);
  return `${readTime} min read`;
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;

  const article = await prisma.article.findUnique({
    where: { slug },
    include: {
      image: true,
      author: true,
    },
  });

  if (!article || !article.published) {
    notFound();
  }

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(article.createdAt);

  const readTime = calculateReadTime(article.content);

  const relatedArticles = await prisma.article.findMany({
    where: {
      published: true,
      NOT: { id: article.id },
      authorId: article.authorId,
    },
    take: 3,
    orderBy: { createdAt: 'desc' },
    include: { image: true },
  });

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 z-50">
        <div className="h-full bg-blue-600 dark:bg-blue-500 w-0" id="progress-bar" />
      </div>

      <nav className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/news"
              className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="hidden sm:inline">Бүх нийтлэл</span>
              <span className="sm:hidden">Буцах</span>
            </Link>

            <div className="flex items-center gap-3">
              <ShareButton title={article.title} summary={article.summary} slug={article.slug} />
            </div>
          </div>
        </div>
      </nav>

      <header className="relative">
        {article.image?.url && (
          <div className="relative h-[35vh] md:h-[50vh] lg:h-[60vh] w-full">
            <Image
              src={article.image.url}
              alt={article.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          </div>
        )}

        {article.image?.url ? (
          <div className="absolute bottom-0 left-0 right-0 text-white pb-8 md:pb-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight md:leading-snug">
                {article.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm md:text-base text-gray-200">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <time dateTime={article.createdAt.toISOString()}>{formattedDate}</time>
                </div>

                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{readTime}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight md:leading-snug">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm md:text-base text-gray-600 dark:text-gray-400">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <time dateTime={article.createdAt.toISOString()}>{formattedDate}</time>
              </div>

              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>{readTime}</span>
              </div>
            </div>
          </div>
        )}
      </header>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        {article.summary && (
          <div className="mb-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border-l-4 border-blue-600 dark:border-blue-500">
            <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 italic leading-relaxed">
              {article.summary}
            </p>
          </div>
        )}

        <div
          className="
  prose prose-sm md:prose-base lg:prose-lg
  leading-7 md:leading-8
  dark:prose-invert

  prose-p:mb-6
  prose-li:mb-3
  prose-ul:mb-6
  prose-ol:mb-6

  prose-headings:font-bold
  prose-headings:mt-10
  prose-headings:mb-4

  prose-a:text-blue-600 dark:prose-a:text-blue-400
  prose-img:rounded-xl prose-img:shadow-lg

  max-w-none
  "
          dangerouslySetInnerHTML={{
            __html: article.content,
          }}
        />
      </article>

      {relatedArticles.length > 0 && (
        <section className="bg-gray-100 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Холбоотой нийтлэлүүд
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((related) => (
                <Link
                  key={related.id}
                  href={`/news/${related.slug}`}
                  className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                >
                  {related.image?.url && (
                    <div className="relative h-40 w-full overflow-hidden">
                      <Image
                        src={related.image.url}
                        alt={related.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  )}

                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {related.title}
                    </h3>

                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {related.summary}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
