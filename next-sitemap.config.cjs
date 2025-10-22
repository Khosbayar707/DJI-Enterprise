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
        disallow: [
          '/admin',
          '/admin/*',
          '/dashboard',
          '/dashboard/*',
          '/api/*',
          '/_next/*',
          '/auth/*',
          '/profile',
          '/*?search=',
          '/*?*search=',
          '/*?type=',
          '/*?*type=',
          '/*?page=',
          '/*?*page=',
        ],
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
  additionalPaths: async () => {
    try {
      // Дараа нь API-аас dynamic slug-уудыг татаж болно
      return [];
    } catch (e) {
      console.error('additionalPaths error:', e);
      return [];
    }
  },
};
