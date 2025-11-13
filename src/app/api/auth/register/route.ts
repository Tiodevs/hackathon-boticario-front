import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    // validações BEM básicas (pra não te atrapalhar)
    if (!name || !email || !password) {
      return NextResponse.json(
        { ok: false, message: 'Preencha todos os campos.' },
        { status: 400 }
      );
    }

    // se quiser, mantém uma verificação leve de email/senha:
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { ok: false, message: 'E-mail inválido.' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { ok: false, message: 'Senha deve ter pelo menos 6 caracteres.' },
        { status: 400 }
      );
    }

    // simula tempo de processamento
    await new Promise((r) => setTimeout(r, 600));

    // sucesso
    return NextResponse.json({
      ok: true,
      userId: 'mock-user-123',
      message: 'Conta criada.',
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: 'Erro no servidor ao criar conta.' },
      { status: 500 }
    );
  }
}
