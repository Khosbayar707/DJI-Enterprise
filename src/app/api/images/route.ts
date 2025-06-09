import { CustomResponse } from '@/lib/next-responses';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const images = await prisma.image.findMany({
    include: { spec: true, drone: true, garmins: true },
  });
  return CustomResponse(true, 'REQUEST_SUCCESS', 'Хүсэлт амжилттай!', { images });
}
