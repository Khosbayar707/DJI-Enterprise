/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://djigeo.mn',

  generateRobotsTxt: true,
  generateIndexSitemap: true,
  sitemapSize: 5000,
  trailingSlash: false,

  // Эдгээрийг sitemap-д бүү оруул
  exclude: [
    '/admin',
    '/admin/*',
    '/dashboard',
    '/dashboard/*',
    '/api/*',
    '/_next/*',
    '/404',
    '/500',
    '/sitemap.xml',
    '/robots.txt',
    '/auth/*',
    '/profile',
  ],

  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        // Crawl-д хориглох зүйлс
        disallow: [
          '/admin',
          '/admin/*',
          '/dashboard',
          '/dashboard/*',
          '/api/*',
          '/_next/*',
          '/auth/*',
          '/profile',
          // 🔎 Query параметртэй хайлтын/фасеттай хуудсуудыг бүгдийг нь хориглоно
          '/*?search=',
          '/*?*search=',
          '/*?type=',
          '/*?*type=',
          '/*?page=',
          '/*?*page=',
          // хэрэв өөр параметр хэрэглэдэг бол энд нэмж болно (brand, q, sort, filter …)
        ],
      },
    ],
    // Хэрэв тусдаа sitemap-ууд нэмэх бол энд зааж өгнө:
    // additionalSitemaps: ['https://www.djigeo.mn/sitemap-1.xml', ...],
  },

  changefreq: 'weekly',
  priority: 0.7,

  // Sitemap дахь priority/changefreq-ээ төрөл тус бүрээр нарийвчилна
  transform: async (config, path) => {
    let priority = 0.7;
    let changefreq = 'weekly';

    if (path === '/') {
      priority = 1.0;
      changefreq = 'weekly';
    } else if (path.startsWith('/dji') || path.startsWith('/products')) {
      priority = 0.85;
      changefreq = 'weekly';
    } else if (path.startsWith('/blog') || path.startsWith('/news')) {
      priority = 0.8;
      changefreq = 'weekly';
    } else if (path.startsWith('/docs') || path.startsWith('/support')) {
      priority = 0.6;
      changefreq = 'monthly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },

  // Хүсвэл эндээс dynamic замуудаа нэмж өгөөрэй
  additionalPaths: async () => {
    try {
      // Ж: build үед API-гаас slug-уудаа татаж sitemap-д нэмэх
      // const res = await fetch('https://djigeo.mn/api/client/products/drones', { cache: 'no-store' });
      // const { data } = await res.json();
      // return (data?.drones || []).map(d => ({
      //   loc: `/dji/${d.slug || d.id}`,
      //   changefreq: 'weekly',
      //   priority: 0.85,
      //   lastmod: new Date().toISOString(),
      // }));
      return [];
    } catch (e) {
      console.error('additionalPaths error:', e);
      return [];
    }
  },
};
