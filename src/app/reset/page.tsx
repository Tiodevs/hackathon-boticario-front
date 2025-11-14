'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { postJSON } from '@/util/api';

export default function ResetPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'err'>('idle');
  const [msg, setMsg] = useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    // ✅ validação ANTES de chamar a API
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setStatus('err');
      setMsg('E-mail inválido.');
      return; // não chama a API com e-mail torto
    }

    try {
      setStatus('loading');
      setMsg('');

      // ✅ chama a rota mock de reset
      await postJSON('/api/auth/request-password-reset', { email });

      setStatus('ok');
      setMsg('Se o e-mail existir, enviaremos instruções de redefinição.');
    } catch (err: any) {
      setStatus('err');
      setMsg(err?.message || 'Falhou ao enviar. Tente novamente.');
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
                src="/forest.png"
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
              <label htmlFor="email" className="text-sm">Email</label>
              <Input
                id="email"
                type="email"
                placeholder="voce@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              full
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Enviando…' : 'Enviar e-mail'}
            </Button>

            {status !== 'idle' && msg && (
              <p
                role="status"
                aria-live="polite"
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
