import { CustomResponse, NextResponse_CatchError } from '@/lib/next-responses';
import { prisma } from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function DELETE() {
  try {
    const images = await prisma.image.findMany({ select: { public_id: true } });
    const videos = await prisma.video.findMany({ select: { public_id: true } });

    const dbPublicIds = new Set([...images, ...videos].map((item) => item.public_id));
    const deletedResources: string[] = [];

    const fetchAllResources = async (
      type: 'image' | 'video',
      next_cursor?: string,
      collected: string[] = []
    ): Promise<string[]> => {
      const res = await cloudinary.api.resources({
        resource_type: type,
        type: 'upload',
        max_results: 500,
        next_cursor,
      });

      const ids = res.resources.map((r: any) => r.public_id);
      const all = [...collected, ...ids];

      if (res.next_cursor) {
        return fetchAllResources(type, res.next_cursor, all);
      }

      return all;
    };
    const [cloudImageIds, cloudVideoIds] = await Promise.all([
      fetchAllResources('image'),
      fetchAllResources('video'),
    ]);

    const orphanImageIds = cloudImageIds.filter((id) => !dbPublicIds.has(id));
    const orphanVideoIds = cloudVideoIds.filter((id) => !dbPublicIds.has(id));

    const deleteInChunks = async (ids: string[], resource_type: 'image' | 'video') => {
      const chunkSize = 100;
      for (let i = 0; i < ids.length; i += chunkSize) {
        const chunk = ids.slice(i, i + chunkSize);
        const res = await cloudinary.api.delete_resources(chunk, {
          resource_type,
        });
        const deleted = Object.keys(res.deleted || {});
        deletedResources.push(...deleted);
      }
    };

    if (orphanImageIds.length) await deleteInChunks(orphanImageIds, 'image');
    if (orphanVideoIds.length) await deleteInChunks(orphanVideoIds, 'video');

    return CustomResponse(
      true,
      'REQUEST_SUCCESS',
      `Цэвэрлэгээ амжилттай. Устгасан: ${deletedResources.length} файл.`,
      { deletedResources }
    );
  } catch (error) {
    return NextResponse_CatchError(error);
  }
}
