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
      from: `"DJI Mongolia" <${process.env.EMAIL}>`, // sender address
      to: user.email, // list of receivers
      subject: 'DJI - Нууц үг солих хүсэлт ирлээ!', // Subject line
      text: 'Нууц үг солих', // plain text body
      html: `<b>  Сайн байна уу!
      </b>
      <h3>Нууц үг солих холбоос!</h3>
      <strong>
      <a href="${`${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password/${otp}`}" target="_blank">Энд дарна уу!</a>
      </strong>`, // html body
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
