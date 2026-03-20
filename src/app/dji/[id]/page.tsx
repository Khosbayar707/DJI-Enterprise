import { prisma } from '@/lib/prisma';
import ClientPage from '../_components/ClientPage';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;

  const drone = await prisma.drone.findUnique({
    where: { id },
    include: {
      images: true,
    },
  });

  if (!drone) {
    return { title: 'Бараа олдсонгүй' };
  }

  const imageUrl = drone.images?.[0]?.url || '/default-og.jpg';

  return {
    title: `${drone.name} | Инженер Геодези ХХК`,
    description: drone.description?.slice(0, 160),

    keywords: [drone.name, 'DJI дрон', 'drone Mongolia', 'DJI Mongolia', 'Дроны мэдээлэл'],

    openGraph: {
      title: drone.name,
      description: drone.description,
      url: `https://djigeo.mn/dji/${id}`,
      siteName: 'Djigeo',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
        },
      ],
      locale: 'mn_MN',
      type: 'website',
    },

    twitter: {
      card: 'summary_large_image',
      title: drone.name,
      description: drone.description,
      images: [imageUrl],
    },

    alternates: {
      canonical: `https://djigeo.mn/dji/${id}`,
    },
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;

  const drone = await prisma.drone.findUnique({
    where: { id },
    include: {
      images: true,
      videos: true,
      specs: true,
      featuredVideo: true,
      rtk: true,
      categories: true,
      descriptions: true,
      advantages: true,
      tech: true,
      inTheBox: true,
    },
  });

  if (!drone) return <div>Бараа олдсонгүй</div>;

  return <ClientPage drone={drone as any} />;
}
