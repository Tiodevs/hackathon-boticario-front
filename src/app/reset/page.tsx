'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function ResetPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'err'>('idle');
  const [msg, setMsg] = useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setStatus('err');
      setMsg('Digite um e-mail válido.');
      return;
    }

    try {
      setStatus('loading');
      setMsg('');
      // 🔧 integração com backend virá depois
      await new Promise((r) => setTimeout(r, 800));
      setStatus('ok');
      setMsg('Se o e-mail existir, enviaremos instruções de redefinição.');
    } catch {
      setStatus('err');
      setMsg('Falhou ao enviar. Tente novamente.');
    } finally {
      setTimeout(() => setStatus('idle'), 4000);
    }
  }

  return (
    <main className="min-h-dvh bg-[#0b0b0b] text-zinc-50 px-4 py-8">
      <div className="mx-auto w-full max-w-6xl md:grid md:grid-cols-2 md:gap-10">
        {/* CARD COM FOTO — igual às outras páginas */}
        <section className="hidden md:block">
          <div className="rounded-3xl border border-zinc-800/80 bg-zinc-900/40 p-2">
            <div className="relative h-[72vh] overflow-hidden rounded-2xl">
              <Image
                src="/forest.jpg"
                alt="Foco - plano de fundo"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute left-6 top-6 text-lg font-semibold">
                <span className="mr-2 rounded-md bg-black/60 px-2 py-1">⚡</span>
                FOCO
              </div>
              <div className="absolute bottom-10 left-0 right-0 text-center">
                <h2 className="text-xl font-medium">Suas tarefas, seu controle.</h2>
                <p className="mt-2 text-xs text-zinc-400">Projeto do hackathon</p>
              </div>
            </div>
          </div>
        </section>

        {/* FORMULÁRIO */}
        <section className="mt-6 md:mt-0 md:flex md:flex-col md:justify-center">
          <header className="mb-8">
            <div className="mb-8 md:hidden text-lg font-semibold">⚡ FOCO</div>
            <h1 className="text-3xl font-semibold tracking-tight">Recuperar conta</h1>
            <p className="mt-1 text-sm text-zinc-400">
              Você já tem uma conta?{' '}
              <Link href="/login" className="text-[#b6ff00] hover:underline">
                Entrar na conta
              </Link>
            </p>
          </header>

          <form className="space-y-4" onSubmit={onSubmit} noValidate>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="voce@email.com"
                className="h-11 w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 text-sm outline-none ring-0 focus:border-zinc-700 focus:ring-2 focus:ring-[#b6ff00]"
                aria-invalid={status === 'err' ? true : undefined}
                required
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="mt-2 h-11 w-full rounded-full bg-[#b6ff00] font-semibold text-black transition hover:opacity-90 disabled:opacity-60 active:scale-[.99]"
            >
              {status === 'loading' ? 'Enviando…' : 'Enviar e-mail'}
            </button>

            {status !== 'idle' && msg && (
              <p
                role="status"
                className={`text-sm rounded-md border px-3 py-2 ${
                  status === 'ok'
                    ? 'border-lime-500/40 bg-lime-500/10 text-lime-300'
                    : 'border-red-500/40 bg-red-500/10 text-red-300'
                }`}
              >
                {msg}
              </p>
            )}
          </form>
        </section>
      </div>
    </main>
  );
}
