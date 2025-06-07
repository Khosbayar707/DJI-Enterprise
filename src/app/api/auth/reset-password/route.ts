import { CustomResponse, NextResponse_CatchError } from '@/lib/next-responses';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';
import { nanoid } from 'nanoid';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const expiryTime = new Date(Date.now() - 600 * 1000); // 10мин

export async function GET(req: NextRequest) {
  try {
    await prisma.oTP.deleteMany({
      where: { createdAt: { lte: expiryTime } },
    });
    const otp = req.nextUrl.searchParams.get('otp');
    if (!otp) {
      return CustomResponse(false, 'NO_OTP_PROVIDED', 'Нэг удаагийн код илгээгээгүй байна!', null);
    }
    const userOTP = await prisma.oTP.findUnique({ where: { otp } });
    if (!userOTP) {
      return CustomResponse(
        false,
        'NOT_A_VALID_OTP',
        'Нэг удаагийн код буруу эсвэл хугацаа дууссан',
        null
      );
    }
    return CustomResponse(true, 'REQUEST_SUCCESS', 'Код зөв', { OTP: userOTP });
  } catch (err) {
    console.error(err);
    return NextResponse_CatchError(err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) {
      return CustomResponse(false, 'NO_EMAIL_PROVIDED', 'Майл хаяг алга!', null);
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return CustomResponse(false, 'USER_NOT_FOUND', 'Хэрэглэгч олдсонгүй!', null);
    }
    const otp = nanoid();

    await prisma.oTP.create({ data: { otp, userId: user.id } });
    await transporter.sendMail({
      from: `"DJI Mongolia" <${process.env.EMAIL}>`,
      to: user.email,
      subject: 'DJI - Нууц үг солих хүсэлт ирлээ!',
      text:
        'Нууц үг солих холбоос: ' +
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password/${otp}`,
      html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 8px;">
      <h2 style="color: #0070f3;">DJI Mongolia</h2>
      <p>Сайн байна уу,</p>
      <p>Та нууц үг сэргээх хүсэлт илгээсэн байна.</p>
      
      <div style="margin: 20px 0; text-align: center;">
        <a href="${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password/${otp}" 
           style="display: inline-block; background-color: #0070f3; color: white; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold;">
          Нууц үг солих
        </a>
      </div>

      <p style="font-size: 14px; color: #555;">
        Хэрвээ та энэ хүсэлтийг явуулаагүй бол тоохгүй орхиж болно.<br />
        Холбоос нь 10 минутын дотор хүчинтэй байна.
      </p>

      <p style="margin-top: 30px; font-size: 14px; color: #777;">Хүндэтгэсэн,<br />DJI Mongolia баг</p>
    </div>
  `,
    });

    return CustomResponse(
      true,
      'REQUEST_SUCCESS',
      'Таны майл рүү холбоос илгээсэн. Хэрвээ ирээгүй байвал спам болон хогийн савыг шалгана уу!',
      null
    );
  } catch (err) {
    console.error(err);
    return NextResponse_CatchError(err);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { password, otp } = await req.json();
    if (!password && !otp) {
      return CustomResponse(false, 'REQUEST_FAILED', 'Мэдээлэл дутуу', null);
    }
    const userOTP = await prisma.oTP.findUnique({
      where: { otp },
      include: { user: true },
    });
    const encryptedPassword = await bcrypt.hash(password, 15);

    const updateUser = await prisma.user.update({
      where: { id: userOTP?.user.id },
      data: { password: encryptedPassword },
      omit: { password: true },
    });

    return CustomResponse(true, 'REQUEST_SUCCESS', 'Нууц үг амжилттай солигдлоо!', {
      new: updateUser,
    });
  } catch (err) {
    console.error(err);
  }
}
