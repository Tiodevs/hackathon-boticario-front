import Image from "next/image";

export default function LoginPage() {
  return (
    <main className="min-h-dvh bg-[#0b0b0b] text-zinc-50 px-4 py-8">
      <div className="mx-auto w-full max-w-6xl md:grid md:grid-cols-2 md:gap-10">
        {/* CARD DA FOTO – esconde no mobile */}
        <section className="hidden md:block">
          <div className="rounded-3xl border border-zinc-800/80 bg-zinc-900/40 p-2">
            <div className="relative h-[72vh] overflow-hidden rounded-2xl">
              {/* Troca o src pela tua imagem em /public (ex: /forest.jpg) */}
              <Image
                src="/forest.jpg"
                alt="Foco - plano de fundo"
                fill
                className="object-cover"
                priority
              />
              {/* overlay + cantos arredondados */}
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
            <h1 className="text-3xl font-semibold tracking-tight">Entrar na conta</h1>
            <p className="mt-1 text-sm text-zinc-400">
              Você não tem uma conta?{" "}
              <a href="/register" className="text-[#b6ff00] hover:underline">
                Registrar-se
              </a>
            </p>
          </header>

          <form className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="voce@email.com"
                className="h-11 w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 text-sm outline-none ring-0 focus:border-zinc-700 focus:ring-2 focus:ring-[#b6ff00]"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm">
                Senha
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="h-11 w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 text-sm outline-none ring-0 focus:border-zinc-700 focus:ring-2 focus:ring-[#b6ff00]"
              />
            </div>

            <button
              type="submit"
              className="mt-2 h-11 w-full rounded-full bg-[#b6ff00] font-semibold text-black transition hover:opacity-90 active:scale-[.99]"
            >
              Entrar
            </button>

            <div className="py-2 text-center text-sm">
              <a href="#" className="text-zinc-400 hover:underline">
                Recuperar a senha →
              </a>
            </div>

            <div className="my-4 h-px w-full bg-zinc-800" />

            <button
              type="button"
              className="flex h-11 w-full items-center justify-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 text-sm transition hover:bg-zinc-800/70"
            >
              {/* Ícone do Google opcional em /public/google.svg */}
              <Image
                src="/google.svg"
                alt="Google"
                width={18}
                height={18}
                className="opacity-90"
              />
              Entrar com o Google
            </button>
          </form>
        </section>
      </div>

      {/* VERSÃO MOBILE – layout de uma coluna já coberto pelo grid (card some) */}
    </main>
  );
}
