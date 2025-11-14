import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // validação básica de segurança
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { ok: false, message: 'E-mail inválido.' },
        { status: 400 }
      );
    }

    // simula tempo de processamento
    await new Promise((r) => setTimeout(r, 600));

    // não revela se o e-mail existe ou não (boa prática)
    return NextResponse.json({
      ok: true,
      message: 'Se o e-mail existir, enviaremos instruções de redefinição.',
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: 'Erro no servidor.' },
      { status: 500 }
    );
  }
}
