import Image from "next/image";
import Link from "next/link";
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function RegisterPage() {
  return (
    <main className="min-h-dvh bg-[#0b0b0b] text-zinc-50 px-4 py-8">
      <div className="mx-auto w-full max-w-6xl md:grid md:grid-cols-2 md:gap-10">
        {/* CARD COM FOTO — escondido no mobile */}
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
            <h1 className="text-3xl font-semibold tracking-tight">Criar conta</h1>
            <p className="mt-1 text-sm text-zinc-400">
              Você já tem uma conta?{" "}
              <Link href="/login" className="text-[#b6ff00] hover:underline">
                Entrar na conta
              </Link>
            </p>
          </header>

          <form className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm">Nome completo</label>
              <Input id="name" type="text" placeholder="Seu nome" />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm">Email</label>
              <Input id="email" type="email" placeholder="seu-email@email.com" />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm">Senha</label>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>

            <Button type="submit" full>
              Criar conta
            </Button>

            <div className="my-4 h-px w-full bg-zinc-800" />

            <Button type="button" variant="ghost" full className="gap-2">
              <Image
                src="/google.svg"
                alt="Google"
                width={18}
                height={18}
                className="opacity-90"
              />
              Entrar com o Google
            </Button>
          </form>
        </section>
      </div>
    </main>
  );
}
