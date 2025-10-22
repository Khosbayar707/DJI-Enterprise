/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://djigeo.mn',

  generateRobotsTxt: true,
  generateIndexSitemap: true,
  sitemapSize: 5000,

  trailingSlash: false,

  exclude: [
    '/admin',
    '/admin/*',
    '/dashboard',
    '/dashboard/*',
    '/api/*',
    '/_next/*',
    '/404',
    '/500',
    '/sitemap.xml', // өөрөө үүсгэнэ
    '/robots.txt', // өөрөө үүсгэнэ
  ],

  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/*', '/dashboard', '/dashboard/*', '/api/*', '/_next/*'],
      },
    ],
  },

  changefreq: 'weekly',
  priority: 0.7,

  transform: async (config, path) => {
    let priority = 0.7;
    let changefreq = 'weekly';

    if (path === '/') {
      priority = 1.0;
      changefreq = 'weekly';
    } else if (path.startsWith('/dji') || path.startsWith('/products')) {
      // Бүтээгдэхүүний ангилал/дэлгэрэнгүй
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

  additionalPaths: async (config) => {
    try {
      // Жишээ: таны бүтээгдэхүүний slugs-г API-аас авах (build үед ажиллана)
      // const res = await fetch('https://djigeo.mn/api/client/products/drones');
      // const { data } = await res.json();
      // const productUrls = (data?.drones || []).map(d => ({
      //   loc: `/dji/${d.slug || d.id}`,
      //   changefreq: 'weekly',
      //   priority: 0.85,
      //   lastmod: new Date().toISOString(),
      // }));
      // return productUrls;

      return []; // Одоохондоо хоосон; дээрхийг идэвхжүүлээрэй.
    } catch (e) {
      console.error('additionalPaths error:', e);
      return [];
    }
  },
};
