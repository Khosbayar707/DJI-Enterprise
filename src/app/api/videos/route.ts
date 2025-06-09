import { CustomResponse } from '@/lib/next-responses';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const videos = await prisma.video.findMany({ include: { spec: true, drone: true } });
  return CustomResponse(true, 'REQUEST_SUCCESS', 'Хүсэлт амжилттай!', { videos });
}
