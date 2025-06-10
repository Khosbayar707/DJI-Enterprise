import { InstructionRequestSchema } from '@/app/_component/utils/instruction-request-schema';
import { checkAdminAuth } from '@/lib/check-admin';
import { CustomResponse, NextResponse_CatchError } from '@/lib/next-responses';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const requests = await prisma.instructionRequest.findMany({ orderBy: { createdAt: 'desc' } });
  return CustomResponse(true, 'REQUEST_SUCCESS', 'Хүсэлт амжилттай!', { requests });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = InstructionRequestSchema.safeParse(body);

    if (!parsed.success) {
      return CustomResponse(false, 'VALIDATION_ERROR', 'Буруу өгөгдөл байна', {
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const { username, phone, email } = parsed.data;
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded?.split(',')[0].trim() || 'unknown';

    const existingRequest = await prisma.instructionRequest.findFirst({
      where: {
        OR: [{ ip, resolved: false }, ...(phone ? [{ phone }] : []), ...(email ? [{ email }] : [])],
      },
    });

    if (existingRequest) {
      return CustomResponse(false, 'POSSIBLE_SPAM', 'Та өмнө нь хүсэлт илгээсэн байна.', null);
    }

    const newRequest = await prisma.instructionRequest.create({
      data: { username, phone, email, ip },
    });

    return CustomResponse(true, 'REQUEST_SUCCESS', 'Амжилттай илгээлээ!', {
      new: newRequest,
    });
  } catch (err) {
    console.error('[Instruction Request Error]', err);
    return NextResponse_CatchError(err);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id } = await req.json();
    const checked = checkAdminAuth(req);
    if (checked) return checked;
    const request = await prisma.instructionRequest.findUnique({ where: { id } });
    if (!request) return CustomResponse(false, 'REQUEST_FAILED', 'Хүсэлт олдсонгүй!', null);
    const change = await prisma.instructionRequest.update({
      where: { id: request.id },
      data: { resolved: true },
    });

    return CustomResponse(true, 'REQUEST_SUCCESS', 'Хүсэлтийн төлөв амжилттай үүслээ!', { change });
  } catch (err) {
    console.error(err);
    return NextResponse_CatchError(err);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id');
    if (!id) return CustomResponse(false, 'NO_ID_PROVIDED', 'Таних тэмдэг алга!', null);
    const checked = checkAdminAuth(req);
    if (checked) return checked;
    const request = await prisma.instructionRequest.findUnique({ where: { id } });
    if (!request) return CustomResponse(false, 'REQUEST_FAILED', 'Хүсэлт олдсонгүй!', null);
    const deleted = await prisma.instructionRequest.delete({ where: { id: request.id } });

    return CustomResponse(true, 'REQUEST_SUCCESS', 'Амжилттай устлаа!', { deleted });
  } catch (err) {
    console.error(err);
    return NextResponse_CatchError(err);
  }
}
