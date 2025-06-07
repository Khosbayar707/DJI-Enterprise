import {
  CustomResponse,
  NextResponse_CatchError,
  NextResponse_NoEnv,
  NextResponse_NotAnAdmin,
  NextResponse_NoToken,
} from '@/lib/next-responses';
import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});
export async function GET(req: NextRequest) {
  try {
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
    const users = await prisma.droneBuyRequest.findMany({
      include: { drone: true, user: { omit: { password: true } } },
      orderBy: { createdAt: 'desc' },
    });
    return CustomResponse(true, 'REQUEST_SUCCESS', 'Хүсэлт амжилттай!', {
      users,
    });
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id } = await req.json();
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
    const request = await prisma.droneBuyRequest.findUnique({
      where: { id },
      include: { user: true, drone: true },
    });
    if (!request) {
      return CustomResponse(false, 'REQUEST_NOT_FOUND', 'Хүсэлт олдсонгүй!', null);
    }
    await transporter.sendMail({
      from: `"DJI Mongolia" <${process.env.EMAIL}>`,
      to: request.user.email,
      subject: `Дроны дэлгэрэнгүй мэдээлэл: ${request.drone.name}`,
      text: `Дрон: ${request.drone.name} - Үнэ: ₮${request.drone.price}`,
      html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 8px;">
      <h2 style="color: #0070f3;">DJI Mongolia</h2>
      <p>Сайн байна уу,</p>
      <p>Таны сонирхож буй дроны мэдээлэл:</p>
      
      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <tr>
          <td style="font-weight: bold; padding: 8px;">Нэр:</td>
          <td style="padding: 8px;">${request.drone.name}</td>
        </tr>
        <tr style="background-color: #f9f9f9;">
          <td style="font-weight: bold; padding: 8px;">Үнэ:</td>
          <td style="padding: 8px;">₮${request.drone.price.toLocaleString()}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; padding: 8px;">Тайлбар:</td>
          <td style="padding: 8px;">${request.drone.description}</td>
        </tr>
        <tr style="background-color: #f9f9f9;">
          <td style="font-weight: bold; padding: 8px;">Жин:</td>
          <td style="padding: 8px;">${request.drone.weight}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; padding: 8px;">Хямдрал:</td>
          <td style="padding: 8px;">${request.drone.discount}%</td>
        </tr>
        <tr style="background-color: #f9f9f9;">
          <td style="font-weight: bold; padding: 8px;">Нөөц:</td>
          <td style="padding: 8px;">${request.drone.stock} ширхэг</td>
        </tr>
      </table>

      <div style="margin-top: 20px;">
        <a href="${process.env.NEXT_PUBLIC_BASE_URL}/dji/${request.drone.id}" 
           style="display: inline-block; background-color: #0070f3; color: white; text-decoration: none; padding: 10px 20px; border-radius: 5px;">
          Дэлгэрэнгүй харах
        </a>
      </div>

      <p style="margin-top: 30px; font-size: 14px; color: #555;">Баярлалаа!<br />DJI Mongolia</p>
    </div>
  `,
    });

    const changeRequest = await prisma.droneBuyRequest.update({
      where: { id: request.id },
      data: {
        resolved: true,
      },
    });

    return CustomResponse(true, 'REQUEST_SUCCESS', 'Мэдээлэл амжилттай илгээлээ!', {
      changed: changeRequest,
    });
  } catch (err) {
    console.error(err);
    return NextResponse_CatchError(err);
  }
}
