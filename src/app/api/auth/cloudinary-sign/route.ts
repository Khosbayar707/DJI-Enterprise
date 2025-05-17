import { v2 } from "cloudinary";
import { NextResponse } from "next/server";

export async function GET() {
  v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = v2.utils.api_sign_request(
    { timestamp },
    process.env.CLOUDINARY_API_SECRET as string
  );
  return NextResponse.json({
    timestamp,
    signature,
    api_key: process.env.CLOUDINARY_API_KEY,
  });
}
