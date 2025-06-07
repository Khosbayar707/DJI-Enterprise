import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import {
  NextResponse_CatchError,
  NextResponse_NoEnv,
  NextResponse_NotAnAdmin,
  NextResponse_NoToken,
} from './next-responses';

export function checkAdminAuth(req: NextRequest): NextResponse | null {
  if (!process.env.JWT_SECRET) {
    return NextResponse_NoEnv();
  }

  const accessToken = req.cookies.get('accessToken')?.value;
  if (!accessToken) {
    return NextResponse_NoToken();
  }

  try {
    const verify = jwt.verify(accessToken, process.env.JWT_SECRET) as {
      isAdmin: boolean;
    };

    if (!verify.isAdmin) {
      return NextResponse_NotAnAdmin();
    }

    return null;
  } catch (err) {
    return NextResponse_CatchError(err);
  }
}
