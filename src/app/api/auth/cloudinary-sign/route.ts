import {
  CustomResponse,
  NextResponse_NoEnv,
  NextResponse_NotAnAdmin,
  NextResponse_NoToken,
} from '@/lib/next-responses';
import { v2 } from 'cloudinary';
import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(req: NextRequest) {
  if (!process.env.JWT_SECRET) {
    return NextResponse_NoEnv();
  }
  const accessToken = req.cookies.get('accessToken')?.value;
  if (!accessToken) {
    return NextResponse_NoToken();
  }
  const verify = jwt.verify(accessToken, process.env.JWT_SECRET) as {
    isAdmin: boolean;
  };
  if (!verify.isAdmin) {
    return NextResponse_NotAnAdmin();
  }
  v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  const folder = req.nextUrl.searchParams.get('folder') || '';
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = v2.utils.api_sign_request(
    { timestamp, folder },
    process.env.CLOUDINARY_API_SECRET as string
  );
  return CustomResponse(true, 'SUCCESS', 'Амжилттай', {
    timestamp,
    signature,
    api_key: process.env.CLOUDINARY_API_KEY,
  });
}
