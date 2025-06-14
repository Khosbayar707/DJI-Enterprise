/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://djigeo.mn',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  exclude: ['/admin'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/dashboard'],
      },
    ],
  },
};
