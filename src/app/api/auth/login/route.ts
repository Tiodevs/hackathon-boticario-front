import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ ok: false, message: 'E-mail inválido.' }, { status: 400 });
    }

    if (!password || password.length < 6) {
      return NextResponse.json({ ok: false, message: 'Senha inválida.' }, { status: 400 });
    }

    await new Promise((r) => setTimeout(r, 400));

    return NextResponse.json({
      ok: true,
      token: 'mock-jwt',
      user: { email },
    });
  } catch (err) {
    return NextResponse.json({ ok: false, message: 'Erro no servidor.' }, { status: 500 });
  }
}

export function GET() {
  return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
}
