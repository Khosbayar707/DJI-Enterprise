/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://djigeo.mn',
  generateRobotsTxt: true, // (optional)
  // ...other options
};
