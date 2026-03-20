import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://djigeo.mn';

  const news = await prisma.article.findMany({ select: { slug: true, updatedAt: true } });
  const dji = await prisma.drone.findMany({ select: { id: true, updatedAt: true } });
  const garmin = await prisma.garminProduct.findMany({ select: { id: true, updatedAt: true } });
  const hitarget = await prisma.surveyEquipment.findMany({ select: { id: true, updatedAt: true } });
  const payload = await prisma.dronePayload.findMany({ select: { id: true, updatedAt: true } });

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/dji`, lastModified: new Date() },
    { url: `${baseUrl}/garmin`, lastModified: new Date() },
    { url: `${baseUrl}/hitarget`, lastModified: new Date() },
    { url: `${baseUrl}/payload`, lastModified: new Date() },
    { url: `${baseUrl}/trainings`, lastModified: new Date() },
    { url: `${baseUrl}/news`, lastModified: new Date() },

    ...news.map((item) => ({ url: `${baseUrl}/news/${item.slug}`, lastModified: item.updatedAt })),
    ...dji.map((item) => ({ url: `${baseUrl}/dji/${item.id}`, lastModified: item.updatedAt })),
    ...garmin.map((item) => ({
      url: `${baseUrl}/garmin/${item.id}`,
      lastModified: item.updatedAt,
    })),
    ...hitarget.map((item) => ({
      url: `${baseUrl}/hitarget/${item.id}`,
      lastModified: item.updatedAt,
    })),
    ...payload.map((item) => ({
      url: `${baseUrl}/payload/${item.id}`,
      lastModified: item.updatedAt,
    })),
  ];
}
